export interface Company {
	id: string;
	companyName: string;
	licenseType: string;
	isActive: boolean;
	phone: string;
	description: string;
	endDate: string;
	creationDate: string;
}

export interface CompaniesResponse {
	data: Company[];
	total: number;
	page: number;
	limit: number;
}

export interface CreateCompanyRequest {
	companyName: string;
	licenseType: string;
	isActive: boolean;
	phone: string;
	description: string;
	endDate: string;
}

export interface UpdateCompanyRequest {
	companyName?: string;
	licenseType?: string;
	isActive?: boolean;
	phone?: string;
	description?: string;
	endDate?: string;
}
