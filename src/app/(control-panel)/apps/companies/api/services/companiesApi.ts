import { api } from '@/utils/api';
import {
	Company,
	CompaniesResponse,
	CreateCompanyRequest,
	UpdateCompanyRequest,
	Region,
	RegionsResponse
} from '../types';

export const companiesApi = {
	getCompanies: async (): Promise<Company[]> => {
		const response = await api.get('companies').json<CompaniesResponse>();
		return response.data || (response as unknown as Company[]);
	},

	getCompany: async (id: string): Promise<Company> => {
		const response = await api.get(`companies/${id}`).json<Company>();
		return response;
	},

	createCompany: async (companyData: CreateCompanyRequest): Promise<Company> => {
		const response = await api.post('companies', { json: companyData }).json<Company>();
		return response;
	},

	updateCompany: async (id: string, companyData: UpdateCompanyRequest): Promise<Company> => {
		const response = await api.put(`companies/${id}`, { json: companyData }).json<Company>();
		return response;
	},

	getRegions: async (): Promise<Region[]> => {
		const response = await api.get('regions').json<RegionsResponse>();
		return response.data || (response as unknown as Region[]);
	}
};
