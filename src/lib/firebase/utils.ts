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
