<script lang="ts">
  import { storage, db as firestore, auth } from '$lib/firebase/firebase.client';
  import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
  import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
  import { onAuthStateChanged } from 'firebase/auth';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let fileInput: HTMLInputElement;
  let uploading = false;
  let user = auth.currentUser;
  let progress = 0;

  // Props
  export let directory = ''; // Optional directory path in Firebase Storage
  export let metadata = {}; // Additional metadata to attach to the file
  export let allowedTypes: string[] = []; // List of allowed MIME types

  const submit = async (event: Event) => {
    event.preventDefault();
    uploading = true;

    if (!user) {
      alert('You must be signed in to upload files.');
      uploading = false;
      return;
    }

    const file = fileInput.files?.[0];
    if (!file) {
      alert('Please select a file.');
      uploading = false;
      return;
    }

    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      alert('Selected file type is not allowed.');
      uploading = false;
      return;
    }

    try {
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.name}`;
      const filePath = directory ? `${directory}/${fileName}` : fileName;
      const fileRef = storageRef(storage, filePath);

      const uploadTask = uploadBytesResumable(fileRef, file, metadata);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.error('Upload error:', error);
          alert('Upload failed.');
          dispatch('error', { error });
          uploading = false;
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Save file metadata to Firestore
          const docRef = await addDoc(collection(firestore, 'uploads'), {
            name: file.name,
            url: downloadURL,
            path: filePath,
            uploadedAt: serverTimestamp(),
            userId: user.uid,
            ...metadata, // Include any additional metadata
          });

          dispatch('success', { url: downloadURL, docId: docRef.id, filename: file.name });
          alert('File uploaded successfully!');
          uploading = false;
          fileInput.value = ''; // Reset the file input
          progress = 0;
        }
      );
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred during upload.');
      dispatch('error', { error });
      uploading = false;
    }
  };
</script>

<form on:submit|preventDefault={submit}>
  <input type="file" bind:this={fileInput} />
  <button type="submit" disabled={uploading || !user}>
    {uploading ? 'Uploading...' : 'Upload'}
  </button>
</form>

{#if uploading}
  <progress max="100" value={progress}></progress>
  <p>Upload progress: {progress.toFixed(2)}%</p>
{/if}

{#if !user}
  <p>Please sign in to upload files.</p>
{/if}