enum DisasterType {
	Killed = 'Killed',
	Injured = 'Injured',
	ChurchBurnt = 'Church burnt',
	HouseBurnt = 'House burnt',
	Looted = 'Looted',
	Other = 'Other'
}

enum GenderType {
	Male = 'Male',
	Female = 'Female'
}

enum Jobs {
	None = 'None',
	Student = 'Student',
	JobWork = 'Job / Work',
	Others = 'Others'
}

enum DisasterVictimType {
	Father = 'Father',
	Mother = 'Mother',
	Son = 'Son',
	Daughter = 'Daughter',
	Sister = 'Sister',
	Brother = 'Brother',
	Relative = 'Relative',
	Others = 'Others'
}

enum CounselingType {
	VisitHome = 'Visit Home',
	ComeToCenter = 'Come to Center',
	Call = 'Call',
	Absence = 'Absence',
	Others = 'Others'
}

enum ReferType {
	CareerCounselor = 'Career Counselor',
	Psychiatrist = 'Psychiatrist',
	VocationalTrainer = 'Vocational Trainer',
	Lawyer = 'Lawyer',
	Others = 'Others'
}

enum ResultOfAction {
	CounselingFollowUp = 'Counseling follow-up',
	ServiceTermination = 'Service termination',
	CaseManagementRegistration = 'Case management registration'
}

enum CounselingEndingType {
	CompleteRecovery = 'Complete recovery',
	FindingJob = 'Finding a job',
	HavingReliableCareer = 'Having a reliable career',
	Others = 'Others'
}

type Client = {
	id: string;
	disasterName: string;
	disasterType: DisasterType;
	fatherName: string;
	name: string;
	gender: GenderType;
	dob: string;
	cnicNumber: string;
	code: string;
	contactNoHome: string;
	mobile: string;
	address: string;
	job: Jobs;
	schoolName: string;
	grade: string;
	companyName: string;
	otherJobs: string;
	disasterVictimType: DisasterVictimType;
	referTo: ReferType;
	resultOfAction: ResultOfAction;
	registeredAt: number;
	createdAt: number;
	updatedAt: number;
};

type Counseling = {
	id: string;
	clientId: string;
	createdAt: number;
	updatedAt: number;
	startTime: number;
	endTime: number;
	counselorId: string;
	counselingType: CounselingType;
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
	endingType?: CounselingEndingType;
	reason?: string;
};

type Link = {
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