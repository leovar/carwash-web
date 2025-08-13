import { useMutation, useQueryClient } from '@tanstack/react-query';
import { companiesApi } from '../services/companiesApi';
import { UpdateCompanyRequest } from '../types';
import { companiesQueryKey } from './useCompanies';
import { companyQueryKey } from './useCompany';

export const useUpdateCompany = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateCompanyRequest }) => companiesApi.updateCompany(id, data),
		onSuccess: (_, company) => {
			// Invalidate companies list to refetch data
			queryClient.invalidateQueries({ queryKey: companiesQueryKey });
			queryClient.invalidateQueries({ queryKey: companyQueryKey(company.id) });
		}
	});
};
