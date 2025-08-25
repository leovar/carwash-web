import { useMutation, useQueryClient } from '@tanstack/react-query';
import { subscriptionPlansApi } from '../services/subscriptionPlansApi';
import { CreateSubscriptionPlanRequest } from '../types';

export const useCreateSubscriptionPlan = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (planData: CreateSubscriptionPlanRequest) => subscriptionPlansApi.createSubscriptionPlan(planData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['subscription-plans'] });
		}
	});
};
