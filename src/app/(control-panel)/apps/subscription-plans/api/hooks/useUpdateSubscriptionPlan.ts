import { useMutation, useQueryClient } from '@tanstack/react-query';
import { subscriptionPlansApi } from '../services/subscriptionPlansApi';
import { UpdateSubscriptionPlanRequest } from '../types';

export const useUpdateSubscriptionPlan = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, planData }: { id: string; planData: UpdateSubscriptionPlanRequest }) => 
			subscriptionPlansApi.updateSubscriptionPlan(id, planData),
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({ queryKey: ['subscription-plans'] });
			queryClient.invalidateQueries({ queryKey: ['subscription-plan', id] });
		}
	});
};