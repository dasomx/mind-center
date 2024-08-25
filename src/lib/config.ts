import firebase from 'firebase/compat/app';
import { type Client, type Counseling } from './types/index.d.ts';

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
	id: null,
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

export const INIT_COUNSELING: Counseling = {
	id: '',
	clientId: '',
	disasterType: '',
	disasterName: '',
	clientName: '',
	clientMobile: '',
	counselorId: '',
	counselingType: '',
	relationVictim: '',
	relationFamilyDetail: '',
	status: '',
	startTime: new Date(),
	endTime: new Date(),
	date: '',
	createdAt: '',
	updatedAt: '',
	emergencyIntervention: "",
	counselingTopic: "",
	counselingDetails: "",
	pictureUrls: [""],
	psychologicalAidDetails: "S",
	categoricalEvaluation: {
		psychological: 0,
		physical: 0,
		educational: 0,
		financial: 0,
		spriitual: 0
	},
	assessmentId: '',
	treatmentEnding: '',
	endingType: ''
};

export const COUNSELING_TYPE = [
	'Visit Home',
	'Come to Center',
	'Call',
	'Absence',
	'Others'
];