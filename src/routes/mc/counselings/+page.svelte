<script>
    import TextField from "@smui/textfield";
    import Button from "@smui/button";

    let name = "";
    let disasterType = "";
    let mobile = "";
    let dob = "";
    let code = "";
    let counselingDate = "";
    let startTime = "";
    let endTime = "";
    let counselor = "";
    let counselingType = "";
    let informationProviderRelationship = "";
    let informationProviderName = "";
    let informationProviderAddress = "";
    let informationProviderMobile = "";
    let informationProviderHome = "";
    let disasterTypeOptions = ["Killed", "Injured", "Church burnt", "House burnt", "Looted", "Other"];
    let counselingTopics = "";
    let counselingDetail = "";
    let psychologicalProfile = "";
    let physicalProfile = "";
    let socialProfile = "";
    let educationalProfile = "";
    let financialProfile = "";
    let spiritualProfile = "";

    let searchResults = [];

    function calculateEndTime() {
        // Calculate the end time based on the start time
        // and update the endTime variable
    }

    function saveCounseling() {
        // Save all the input values to the database or perform any other necessary actions
    }
</script>

<main>
    <h1>내담자의 상담내용 입력</h1>

    <!-- Search functionality -->
    <div>
        <TextField placeholder="Name or Mobile" bind:value={name} />
        <!-- Display the search results here -->
        <div>
            {#if searchResults && searchResults.length > 0}
                {#each searchResults as result}
                    <div>{result.name} - {result.mobile}</div>
                {/each}
            {:else}
                <div>No results found</div>
            {/if}
        </div>
        <TextField label="Financial Profile" bind:value={financialProfile} />

        <TextField label="Spiritual Profile" bind:value={spiritualProfile} />
    </div>

    <!-- Save button -->
    <Button on:click={saveCounseling}>Save</Button>
</main>
