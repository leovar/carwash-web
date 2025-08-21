import { useQuery } from '@tanstack/react-query';
import { companiesApi } from '../services/companiesApi';

export const companyQueryKey = (companyId: string) => ['company', companyId];

export const useCompany = (companyId: string) => {
	return useQuery({
		queryKey: companyQueryKey(companyId),
		queryFn: () => companiesApi.getCompany(companyId),
		staleTime: 5 * 60 * 1000, // 5 minutes
		enabled: !!companyId && companyId !== 'new' // Only run query if companyId exists and is not 'new'
	});
};
