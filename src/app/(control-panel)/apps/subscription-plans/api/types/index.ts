export interface SubscriptionPlan {
	id: string;
	annualPrice: number;
	country: string;
	createdDate: Date;
	description: string;
	isActive: boolean;
	licensePeriod: number;
	monthlyPrice: number;
	name: string;
	nonExpiringLicense: boolean;
}

export interface SubscriptionPlansResponse {
	data: SubscriptionPlan[];
	total: number;
	page: number;
	limit: number;
}

export interface CreateSubscriptionPlanRequest {
	name: string;
	monthlyPrice: number;
	annualPrice: number;
	country: string;
	description?: string;
	licensePeriod: number;
	isActive: boolean;
	nonExpiringLicense: boolean;
}

export interface UpdateSubscriptionPlanRequest {
	name?: string;
	monthlyPrice?: number;
	annualPrice?: number;
	country?: string;
	description?: string;
	licensePeriod?: number;
	isActive?: boolean;
	nonExpiringLicense?: boolean;
}