'use client';

import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import useParams from '@fuse/hooks/useParams';
import Link from '@fuse/core/Link';
import _ from 'lodash';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import SubscriptionPlanHeader from '../../ui/SubscriptionPlanHeader';
import SubscriptionPlanForm from './SubscriptionPlanForm';
import { useSubscriptionPlan } from '../../../api/hooks/useSubscriptionPlan';
import SubscriptionPlanModel from '../../../models/SubscriptionPlanModel';

const schema = z.object({
	name: z
		.string()
		.nonempty('Debes ingresar un nombre del plan')
		.min(2, 'El nombre del plan debe tener al menos 2 caracteres'),
	monthlyPrice: z
		.number()
		.min(0, 'El precio mensual debe ser mayor o igual a 0'),
	annualPrice: z
		.number()
		.min(0, 'El precio anual debe ser mayor o igual a 0'),
	country: z
		.string()
		.nonempty('Debes seleccionar un país'),
	licensePeriod: z
		.number()
		.min(1, 'El período de licencia debe ser al menos 1 mes')
});

function SubscriptionPlan() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const routeParams = useParams();

	const { subscriptionPlanId } = routeParams as { subscriptionPlanId: string };

	const { data: subscriptionPlan, isLoading, isError } = useSubscriptionPlan(subscriptionPlanId);

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});

	const { reset, watch } = methods;

	const form = watch();

	useEffect(() => {
		if (subscriptionPlanId === 'new') {
			reset(SubscriptionPlanModel({}));
		}
	}, [subscriptionPlanId, reset]);

	useEffect(() => {
		if (subscriptionPlan) {
			reset({ ...subscriptionPlan });
		}
	}, [subscriptionPlan, reset]);

	if (isLoading) {
		return <FuseLoading />;
	}

	if (isError && subscriptionPlanId !== 'new') {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex h-full flex-1 flex-col items-center justify-center"
			>
				<Typography
					color="text.secondary"
					variant="h5"
				>
					No existe el plan de suscripción!
				</Typography>
				<Button
					className="mt-6"
					component={Link}
					variant="outlined"
					to="/apps/subscription-plans"
					color="inherit"
				>
					Ir a página de planes de suscripción
				</Button>
			</motion.div>
		);
	}

	if (_.isEmpty(form) || (subscriptionPlan && routeParams.subscriptionPlanId !== subscriptionPlan.id && routeParams.subscriptionPlanId !== 'new')) {
		return <FuseLoading />;
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<SubscriptionPlanHeader />}
				content={
					<div className="flex max-w-3xl flex-col gap-6 p-4 sm:p-6">
						<SubscriptionPlanForm />
					</div>
				}
				scroll={isMobile ? 'page' : 'content'}
			/>
		</FormProvider>
	);
}

export default SubscriptionPlan;