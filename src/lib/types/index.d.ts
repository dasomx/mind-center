import type { Timestamp } from 'firebase/firestore';

export enum DisasterType {
	Killed = 'Killed',
	Injured = 'Injured',
	ChurchBurnt = 'Church burnt',
	HouseBurnt = 'House burnt',
	Looted = 'Looted',
	Other = 'Other'
}

export enum GenderType {
	Male = 'Male',
	Female = 'Female'
}

export enum Jobs {
	None = 'None',
	Student = 'Student',
	JobWork = 'Job / Work',
	Others = 'Others'
}

export enum DisasterVictimType {
	Self = 'Self',
	Father = 'Father',
	Mother = 'Mother',
	Son = 'Son',
	Daughter = 'Daughter',
	Sister = 'Sister',
	Brother = 'Brother',
	Relative = 'Relative',
	CoWorker = 'Co-worker',
	Others = 'Others'
}

export enum CounselingType {
	VisitHome = 'Visit Home',
	ComeToCenter = 'Come to Center',
	Call = 'Call',
	Absence = 'Absence',
	Others = 'Others'
}

export enum ReferType {
	CareerCounselor = 'Career Counselor',
	Psychiatrist = 'Psychiatrist',
	VocationalTrainer = 'Vocational Trainer',
	Lawyer = 'Lawyer',
	Others = 'Others'
}

export enum ResultOfAction {
	CounselingFollowUp = 'Counseling Follow-up',
	ServiceTermination = 'Service Termination',
	CaseManagementRegistration = 'Case Management Registration',
	CaseManagementClosure = 'Case Management Closure',
	CaseManagementTransfer = 'Case Management Transfer',
	CaseManagementReOpen = 'Case Management Re-open'
}

export enum CounselingEndingType {
	CompleteRecovery = 'Complete recovery',
	FindingJob = 'Finding a job',
	HavingReliableCareer = 'Having a reliable career',
	Others = 'Others'
}

export const DisasterName = ['816', '922'];

export type Client = {
	id: string | null;
	fatherName?: string;
	name?: string;
	gender?: GenderType;
	dob?: string;
	cnicNumber?: string;
	code?: string;
	contactNoHome?: string;
	mobile?: string;
	address?: string;
	job?: Jobs;
	schoolName?: string;
	grade?: string;
	companyName?: string;
	otherJobs?: string;
	disasterName?: DisasterName;
	disasterType?: DisasterType;
	disasterVictimType: DisasterVictimType;
	referTo?: ReferType;
	resultOfAction?: ResultOfAction;
	status?: ClientStatus;
	sessions?: number;
	caseManager?: string | null;
	medicalCoverage?: string | null;
	createdAt?: firebase.firestore.Timestamp;
	updatedAt?: firebase.firestore.Timestamp;
};

export type Assessment = {
	id: string | null;
	clientId: Client.id;
	respond: any;
	createdAt: Timestamp;
	updatedAt: Timestamp;
};

export type Counseling = {
	id: string | null;
	clientId: Client['id'];
	clientName: Client['name'];
	clientMobile: Client['mobile'];
	disasterName?: DisasterName;
	disasterType?: DisasterType;
	startTime?: Timestamp | null;
	endTime?: Timestamp | null;
	counselorId: string;
	counselingType: CounselingType;
	disasterVictimType: DisasterVictimType;
	status: CounselingStatus;
	emergencyIntervention?: string;
	counselingTopic: string;
	counselingDetails: string;
	pictureUrls: string[];
	psychologicalAidDetails?: string;
	categoricalEvaluation?: {
		psychological: number;
		physical: number;
		educational: number;
		financial: number;
		spiritual: number;
	};
	assessment?: string;
	createdAt: Timestamp;
	updatedAt: Timestamp;
};

export type EndingSession = {
	id: string | null;
	clientId: Client.id;
	createdAt: Timestamp;
	updatedAt: Timestamp;
	treatmentEnding: string | null;
	endingType?: CounselingEndingType | null;
	reason?: string;
};

export type Link = {
	id: string | null;
	clientId: Client.id;
	createdAt: Timestamp;
	updatedAt: Timestamp;
	processingDate: Timestamp;
	referralName: string;
	referType: ReferType;
	receptionist: string;
	organizationName: string;
	reason: string;
};

export type Memo = {
	id: string | null;
	clientId: Client.id;
	createdAt: Timestamp;
	updatedAt: Timestamp;
	content: string;
};

export enum ClientStatus {
	Init = 'Init',
	InProgress = 'In Progress',
	Completed = 'Completed',
	Canceled = 'Canceled',
	Pending = 'Pending',
	Deleted = 'Deleted'
}

export enum CounselingStatus {
	Planned = 'Planned',
	Completed = 'Completed',
	Canceled = 'Canceled'
}

export enum EvaluationCategory {
	'1' = 'Worst',
	'3' = 'Bad',
	'5' = 'So&so',
	'7' = 'Good',
	'10' = 'Best'
}
export type ClientSearchCriteria = {
	name?: string;
	mobile?: string;
	disasterName?: DisasterName;
};

export type CounselingSearchCriteria = {
	name?: string;
	mobile?: string;
	disasterName?: DisasterName;
};

export type LinkSearchCriteria = {
	name?: string;
	mobile?: string;
	disasterName?: DisasterName;
};

export type EndingSearchCriteria = {
	name?: string;
	mobile?: string;
	disasterName?: DisasterName;
};

export type MemoSearchCriteria = {
	name?: string;
	mobile?: string;
	disasterName?: DisasterName;
};

export type AssessmentSearchCriteria = {
	name?: string;
	mobile?: string;
	disasterName?: DisasterName;
};