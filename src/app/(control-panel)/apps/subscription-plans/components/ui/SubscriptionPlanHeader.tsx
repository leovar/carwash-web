import Button from '@mui/material/Button';
import { motion } from 'motion/react';
import { useFormContext } from 'react-hook-form';
import useParams from '@fuse/hooks/useParams';
import { useNavigate } from 'react-router';
import _ from 'lodash';
import Alert from '@mui/material/Alert';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useState, useEffect } from 'react';
import { useCreateSubscriptionPlan } from '../../api/hooks/useCreateSubscriptionPlan';
import { useUpdateSubscriptionPlan } from '../../api/hooks/useUpdateSubscriptionPlan';

function SubscriptionPlanHeader() {
	const routeParams = useParams();
	const { subscriptionPlanId } = routeParams as { subscriptionPlanId: string };
	const [showAlert, setShowAlert] = useState(false);
	const [showErrorAlert, setShowErrorAlert] = useState(false);

	const navigate = useNavigate();
	const methods = useFormContext();

	const { formState, watch, getValues, reset } = methods;
	const { isValid, dirtyFields } = formState;
	const form = watch();

	const name = watch('name');

	const createSubscriptionPlanMutation = useCreateSubscriptionPlan();
	const updateSubscriptionPlanMutation = useUpdateSubscriptionPlan();

	const isLoading = createSubscriptionPlanMutation.isPending || updateSubscriptionPlanMutation.isPending;
	const isCreateSuccess = createSubscriptionPlanMutation.isSuccess;
	const isUpdateSuccess = updateSubscriptionPlanMutation.isSuccess;
	const isCreateError = createSubscriptionPlanMutation.isError;
	const isUpdateError = updateSubscriptionPlanMutation.isError;
	const createError = createSubscriptionPlanMutation.error;
	const updateError = updateSubscriptionPlanMutation.error;

	useEffect(() => {
		if (isCreateSuccess || isUpdateSuccess) {
			reset();
			setShowAlert(true);

			const timer = setTimeout(() => {
				setShowAlert(false);
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [isCreateSuccess, isUpdateSuccess, reset]);

	useEffect(() => {
		if (isCreateError || isUpdateError) {
			setShowErrorAlert(true);

			const timer = setTimeout(() => {
				setShowErrorAlert(false);
			}, 5000);

			return () => clearTimeout(timer);
		}
	}, [isCreateError, isUpdateError]);

	function handleSaveSubscriptionPlan() {
		const data = getValues();

		if (subscriptionPlanId === 'new') {
			createSubscriptionPlanMutation.mutate(data, {
				onSuccess: (newSubscriptionPlan) => {
					navigate(`/apps/subscription-plans/${newSubscriptionPlan.id}`);
				}
			});
		} else {
			updateSubscriptionPlanMutation.mutate({
				id: subscriptionPlanId,
				planData: data
			});
		}
	}

	function handleGoBack() {
		navigate('/apps/subscription-plans');
	}

	return (
		<div className="flex w-full items-center justify-between px-8 py-6">
			{showAlert && (
				<Alert
					severity="success"
					className="mb-6"
				>
					Plan de suscripción creado exitosamente
				</Alert>
			)}
			{showErrorAlert && (
				<Alert
					severity="error"
					className="mb-6"
				>
					Error:{' '}
					{isCreateError
						? createError?.message || 'Error desconocido'
						: updateError?.message || 'Error desconocido'}
				</Alert>
			)}
			<div className="flex flex-col">
				<motion.div
					initial={{ x: 20, opacity: 0 }}
					animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
				>
					<div className="flex items-center space-x-0.5">
						<FuseSvgIcon
							className="text-48"
							size={20}
						>
							lucide:credit-card
						</FuseSvgIcon>
						<h4
							className="text-primary cursor-pointer text-lg font-medium hover:underline"
							onClick={handleGoBack}
							onKeyDown={handleGoBack}
							role="button"
							tabIndex={0}
						>
							Planes de Suscripción
						</h4>
					</div>
				</motion.div>
				<motion.div
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
				>
					<div className="text-2xl leading-8 font-semibold tracking-tight">
						{name || 'Nuevo Plan de Suscripción'}
					</div>
				</motion.div>
			</div>
			<motion.div
				className="flex items-center"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				<Button
					className="ml-4"
					variant="contained"
					color="secondary"
					disabled={_.isEmpty(dirtyFields) || !isValid || isLoading}
					onClick={handleSaveSubscriptionPlan}
					startIcon={<FuseSvgIcon>lucide:save</FuseSvgIcon>}
				>
					Guardar
				</Button>
			</motion.div>
		</div>
	);
}

export default SubscriptionPlanHeader;
