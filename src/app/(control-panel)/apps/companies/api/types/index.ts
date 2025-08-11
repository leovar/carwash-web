export interface Company {
	id: string;
	companyName: string;
	licenseType: string;
	isActive: boolean;
	phone: string;
	endDate: string;
	creationDate: string;
}

export interface CompaniesResponse {
	data: Company[];
	total: number;
	page: number;
	limit: number;
}
