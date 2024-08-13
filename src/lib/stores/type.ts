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

type Client = {
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
};
