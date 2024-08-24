import type { Timestamp } from 'firebase/firestore';

export const convertTimestampToDateString = (timestamp: Timestamp) => {
	return timestamp.toDate().toLocaleDateString();
};
export const convertTimestampToTimeString = (timestamp: Timestamp) => {
	return timestamp.toDate().toLocaleTimeString();
};
export const convertTimestampToDateTimeString = (timestamp: Timestamp) => {
	return timestamp.toDate().toLocaleString();
};
