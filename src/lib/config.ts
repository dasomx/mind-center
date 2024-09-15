import firebase from 'firebase/compat/app';
import {
	CounselingEndingType,
	ReferType,
	type Client,
	type Counseling,
	type EndingSession,
	type Link
} from './types/index.d.ts';
import { Timestamp } from 'firebase/firestore';

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
	'Self',
	'Father',
	'Mother',
	'Son',
	'Daughter',
	'Sister',
	'Brother',
	'Relative',
	'Co-worker',
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
	'Counseling Follow-up',
	'Service Termination',
	'Case Management Registration',
	'Case Management Closure',
	'Case Management Transfer',
	'Case Management Re-open'
];

export const STATUS_TYPES = ['Init', 'In Progress', 'Completed', 'Cancelled', 'Pending', 'Deleted'];

export const COUNSELING_STATUS_TYPES = ['Planned', 'Completed', 'Canceled'];

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
	sessions: '',
	regDate: '',
	createdAt: 0,
	updatedAt: 0
};

export const INIT_COUNSELING: Counseling = {
	id: null,
	clientId: null,
	disasterType: null,
	disasterVictimType: null,
	disasterName: null,
	clientName: '',
	clientMobile: '',
	counselorId: '',
	counselingType: '',
	relationFamilyDetail: '',
	status: '',
	startTime: Timestamp.now(),
	endTime: Timestamp.now(),
	date: '',
	createdAt: '',
	updatedAt: '',
	emergencyIntervention: '',
	counselingTopic: '',
	counselingDetails: '',
	pictureUrls: [],
	psychologicalAidDetails: '',
	categoricalEvaluation: {
		psychological: 0,
		physical: 0,
		educational: 0,
		financial: 0,
		spiritual: 0
	},
	assessment: '',
	treatmentEnding: '',
	endingType: ''
};

export const INIT_LINK: Link = {
	id: null,
	clientId: null,
	referType: ReferType.Others,
	referralName: '',
	receptionist: '',
	createdAt: Timestamp.now(),
	updatedAt: Timestamp.now(),
	processingDate: Timestamp.now(),
	reason: '',
	organizationName: ''
};

export const INIT_ENDING_SESSION: EndingSession = {
	id: null,
	clientId: null,
	createdAt: Timestamp.now(),
	updatedAt: Timestamp.now(),
	treatmentEnding: '',
	endingType: CounselingEndingType.Others,
	reason: ''
};

export const COUNSELING_TYPE = [
	'Visit Home',
	'Come to Center',
	'Call',
	'Absence',
	'Others'
];
export const routes = {
	home: '/',
	login: '/auth/login',
	logout: '/auth/logout',
	clients: '/mc/clients',
	counselings: '/mc/counselings',
	links: '/mc/links',
	profile: '/mc/profile',
	settings: '/mc/settings',
	about: '/about'
};
