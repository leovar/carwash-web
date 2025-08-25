import { api } from '@/utils/api';
import {
	SubscriptionPlan,
	SubscriptionPlansResponse,
	CreateSubscriptionPlanRequest,
	UpdateSubscriptionPlanRequest
} from '../types';

export const subscriptionPlansApi = {
	getSubscriptionPlans: async (): Promise<SubscriptionPlan[]> => {
		const response = await api.get('subscription-plans').json<SubscriptionPlansResponse>();
		return response.data || (response as unknown as SubscriptionPlan[]);
	},

	getSubscriptionPlan: async (id: string): Promise<SubscriptionPlan> => {
		const response = await api.get(`subscription-plans/${id}`).json<SubscriptionPlan>();
		return response;
	},

	createSubscriptionPlan: async (planData: CreateSubscriptionPlanRequest): Promise<SubscriptionPlan> => {
		const response = await api.post('subscription-plans', { json: planData }).json<SubscriptionPlan>();
		return response;
	},

	updateSubscriptionPlan: async (id: string, planData: UpdateSubscriptionPlanRequest): Promise<SubscriptionPlan> => {
		const response = await api.put(`subscription-plans/${id}`, { json: planData }).json<SubscriptionPlan>();
		return response;
	}
};