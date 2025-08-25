import { api } from '@/utils/api';
import {
	SubscriptionPlan,
	SubscriptionPlansResponse,
	CreateSubscriptionPlanRequest,
	UpdateSubscriptionPlanRequest
} from '../types';

export const subscriptionPlansApi = {
	getSubscriptionPlans: async (): Promise<SubscriptionPlan[]> => {
		try {
			const response = await api.get('subscription-plans').json<SubscriptionPlansResponse>();
			return response.data || (response as unknown as SubscriptionPlan[]);
		} catch (error: any) {
			if (error.response?.status === 401) {
				console.log('🔐 401 Authentication Error in getSubscriptionPlans:', {
					status: error.response.status,
					message: error.message,
					responseData: error.response?.data,
					fullError: error
				});
			}
			throw error;
		}
	},

	getSubscriptionPlan: async (id: string): Promise<SubscriptionPlan> => {
		try {
			const response = await api.get(`subscription-plans/${id}`).json<SubscriptionPlan>();
			return response;
		} catch (error: any) {
			if (error.response?.status === 401) {
				console.log('🔐 401 Authentication Error in getSubscriptionPlan:', {
					status: error.response.status,
					message: error.message,
					responseData: error.response?.data,
					fullError: error
				});
			}
			throw error;
		}
	},

	createSubscriptionPlan: async (planData: CreateSubscriptionPlanRequest): Promise<SubscriptionPlan> => {
		try {
			const response = await api.post('subscription-plans', { json: planData }).json<SubscriptionPlan>();
			return response;
		} catch (error: any) {
			if (error.response?.status === 401) {
				console.log('🔐 401 Authentication Error in createSubscriptionPlan:', {
					status: error.response.status,
					message: error.message,
					responseData: error.response?.data,
					fullError: error
				});
			}
			throw error;
		}
	},

	updateSubscriptionPlan: async (id: string, planData: UpdateSubscriptionPlanRequest): Promise<SubscriptionPlan> => {
		try {
			const response = await api.put(`subscription-plans/${id}`, { json: planData }).json<SubscriptionPlan>();
			return response;
		} catch (error: any) {
			if (error.response?.status === 401) {
				console.log('🔐 401 Authentication Error in updateSubscriptionPlan:', {
					status: error.response.status,
					message: error.message,
					responseData: error.response?.data,
					fullError: error
				});
			}
			throw error;
		}
	}
};
