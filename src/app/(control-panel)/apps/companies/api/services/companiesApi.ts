import { api } from '@/utils/api';
import { Company, CompaniesResponse } from '../types';

export const companiesApi = {
	getCompanies: async (): Promise<Company[]> => {
		const response = await api.get('companies').json<CompaniesResponse>();
		return response.data || (response as unknown as Company[]);
	}
};
