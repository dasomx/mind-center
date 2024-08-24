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
	Father = 'Father',
	Mother = 'Mother',
	Son = 'Son',
	Daughter = 'Daughter',
	Sister = 'Sister',
	Brother = 'Brother',
	Relative = 'Relative',
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
	CounselingFollowUp = 'Counseling follow-up',
	ServiceTermination = 'Service termination',
	CaseManagementRegistration = 'Case management registration'
}

export enum CounselingEndingType {
	CompleteRecovery = 'Complete recovery',
	FindingJob = 'Finding a job',
	HavingReliableCareer = 'Having a reliable career',
	Others = 'Others'
}

export const DisasterName = ['816', '922'];

export type Client = {
	id?: string | null;
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
	disasterVictimType?: DisasterVictimType;
	referTo?: ReferType;
	resultOfAction?: ResultOfAction;
	status?: ClientStatus;
	sessions?: number;
	regDate?: string;
	caseManager?: string;
	medicalCoverage?: string;
	createdAt?: firebase.firestore.Timestamp;
	updatedAt?: firebase.firestore.Timestamp;
};

export type Counseling = {
	id: string;
	clientId: Client['id'];
	clientName: Client['name'];
	clientMobile: Client['mobile'];
	disasterName?: DisasterName;
	disasterType?: DisasterType;
	date?: string;
	startTime: date;
	endTime: number;
	counselorId: string;
	counselingType: CounselingType;
	relationVictim: RelationVictim;
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
		spriitual: number;
	};
	assessmentId?: string;
	createdAt: number;
	updatedAt: number;

	// Ending Session Only
	treatmentEnding: string | null;
	endingType?: CounselingEndingType | null;
	reason?: string;
};

export type Link = {
	id: string;
	clientId: string;
	createdAt: number;
	updatedAt: number;
	counselorId: string;
	referralName: string;
	referType: ReferType;
	receptionist: string;
	organizationName: string;
	reason: string;
};

export enum ClientStatus {
	Init = 'Init',
	InProgress = 'In Progress',
	Completed = 'Completed',
	Canceled = 'Canceled',
	Pending = 'Pending'
}

export enum CounselingStatus {
	Planned = 'Planned',
	Completed = 'Completed',
	Canceled = 'Canceled'
}

export enum RelationVictim {
	Self = 'Self',
	Family = 'Family',
	Neighbor = 'Neighbor',
	RelatedWorker = 'Related Worker',
	Others = 'Others'
}