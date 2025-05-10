export type User = {
	id: string;
	email: string;
	emailVerified: boolean;
	name: string;
	image: string;
	plan: "free" | "pro";
};

export type UserSettings = {
	isTwoFactorEnabled: boolean;
	theme: "light" | "dark" | "system";
};

export type UserWithSettings = User & {
	settings: UserSettings;
	subscription: Subscription;
};

export type Subscription = {
	planType: "free" | "pro";
	status: "active" | "inactive";
	currentPeriodStart: string;
	currentPeriodEnd: string;
	cancelAtPeriodEnd: boolean;
};
