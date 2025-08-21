export interface Company {
	id: string;
	address: string;
	city: string;
	companyCode: number;
	companyName: string;
	contactName: string;
	country: string;
	createdDate: Date;
	description: string;
	email: string;
	isActive: boolean;
	mainCompany: string;
	nit: string;
	phone: string;
	region: string;
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

export interface Municipality {
	name: string;
}

export interface Region {
	id: string;
	name: string;
	municipalities: Municipality[];
}

export interface RegionsResponse {
	data: Region[];
	total: number;
	page: number;
	limit: number;
}
