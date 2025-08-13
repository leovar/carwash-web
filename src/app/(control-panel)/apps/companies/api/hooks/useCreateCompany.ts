import { useMutation, useQueryClient } from '@tanstack/react-query';
import { companiesApi } from '../services/companiesApi';
import { companiesQueryKey } from './useCompanies';
export const useCreateCompany = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: companiesApi.createCompany,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: companiesQueryKey });
		}
	});
};
