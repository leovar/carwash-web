import { useQuery } from '@tanstack/react-query';
import { companiesApi } from '../services/companiesApi';

export const regionsQueryKey = ['regions'];

export const useRegions = () => {
	return useQuery({
		queryKey: regionsQueryKey,
		queryFn: companiesApi.getRegions,
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000 // 10 minutes - garbage collection time
	});
};
