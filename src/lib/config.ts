import type { Client } from './types';

export const DISASTER_NAMES = ['816', '922'];

export const DISASTER_TYPES = [
	'Killed',
	'Injured',
	'Church burnt',
	'House burnt',
	'Looted',
	'Other'
];

export const GENDERS = ['Male', 'Female'];

export const JOBS = ['None', 'Student', 'Job / Work', 'Others'];

export const DISASTER_VICTIM_TYPES = [
	'Father',
	'Mother',
	'Son',
	'Daughter',
	'Sister',
	'Brother',
	'Relative',
	'Others'
];

export const REFER_TO = [
	'Career Counselor',
	'Psychiatrist',
	'Vocational Trainer',
	'Lawyer',
	'Others'
];

export const RESULT_OF_ACTION = [
	'Counseling follow-up',
	'Service termination',
	'Case management registration'
];

export const INIT_CLIENT: Client = {
	id: '',
	disasterName: '',
	disasterType: '',
	fatherName: '',
	name: '',
	gender: '',
	dob: '',
	cnicNumber: '',
	code: '',
	contactNoHome: '',
	mobile: '',
	address: '',
	job: '',
	schoolName: '',
	grade: '',
	companyName: '',
	otherJobs: '',
	disasterVictimType: '',
	referTo: '',
	resultOfAction: '',
	caseManager: '',
	medicalCoverage: '',
	status: '',
	sessions: 0,
	regDate: '',
	createdAt: 0,
	updatedAt: 0
};
