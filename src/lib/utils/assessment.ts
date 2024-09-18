import type { Assessment } from '$lib/types';

export const scoreAssessment = (
	respond: { question: string; answer: string | number }[]
): number => {
	const questionsAndAnswers = respond.filter(
		(item: { answer: string | number }) => typeof item.answer === 'number'
	);
	const score = questionsAndAnswers.reduce((acc: number, item: { answer: number | string }) => {
		return typeof item.answer === 'number' ? acc + item.answer : acc;
	}, 0);
	return score;
};

export const numberOfAnswersAssessment = (
	respond: { question: string; answer: string | number; type: string }[]
): number => {
	const questionsAndAnswers = respond.filter(
		(item: { answer: string | number; type: string }) =>
			typeof item.answer === 'number' && item.type === 'Rating'
	);
	return questionsAndAnswers.length;
};
