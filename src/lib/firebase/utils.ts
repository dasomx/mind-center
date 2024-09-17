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

export const convertTimestampToLocaleISOString = (timestamp: Timestamp) => {
	// 로컬 시간으로 변환
	const d = timestamp.toDate();
	const offset = d.getTimezoneOffset() * 60000;
	const localTime = new Date(d.getTime() - offset);

	// 원하는 형식으로 변환
	const formattedTime = localTime.toISOString().slice(0, 16);

	return formattedTime;
};

export const convertTimestampToLocaleDateISOString = (timestamp: Timestamp) => {
	// 로컬 시간으로 변환
	const d = timestamp.toDate();
	const offset = d.getTimezoneOffset() * 60000;
	const localTime = new Date(d.getTime() - offset);

	// 원하는 형식으로 변환
	const formattedTime = localTime.toISOString().slice(0, 10);

	return formattedTime;
};


export function cleanObject(obj: Record<string, any>): void {
	Object.keys(obj).forEach((key) => {
		const value = obj[key];
		if (value && typeof value === 'object' && !Array.isArray(value)) {
			// 객체일 경우 재귀 호출
			cleanObject(value);
		} else if (value === '' || value === undefined) {
			// 빈 문자열 또는 undefined를 null로 변환
			obj[key] = null;
		}
	});
}


