import { useMutation, useQueryClient } from '@tanstack/react-query';
import { companiesApi } from '../services/companiesApi';
import { companiesQueryKey } from './useCompanies';
import useNavigate from '@fuse/hooks/useNavigate';
import { Company } from '../types';

export const useCreateCompany = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: companiesApi.createCompany,
		onSuccess: (data: Company) => {
			queryClient.invalidateQueries({ queryKey: companiesQueryKey });
			//navigate(`/apps/companies`);
		},
		onError: (error) => {
			console.error('Error creating company:', error);
		}
	});
};
