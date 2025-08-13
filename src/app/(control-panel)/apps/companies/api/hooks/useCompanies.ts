import { useQuery } from '@tanstack/react-query';
import { companiesApi } from '../services/companiesApi';

export const companiesQueryKey = ['companies'];

export const useCompanies = () => {
	return useQuery({
		queryKey: companiesQueryKey,
		queryFn: companiesApi.getCompanies,
		staleTime: 5 * 60 * 1000 // 5 minutes
	});
};
