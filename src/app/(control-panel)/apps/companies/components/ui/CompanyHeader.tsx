import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'motion/react';
import { useFormContext } from 'react-hook-form';
import useParams from '@fuse/hooks/useParams';
import _ from 'lodash';
import useNavigate from '@fuse/hooks/useNavigate';
import Alert from '@mui/material/Alert';
import { useCreateCompany } from '../../api/hooks/useCreateCompany';
import { useUpdateCompany } from '../../api/hooks/useUpdateCompany';
import { Company, CreateCompanyRequest } from '../../api/types';
import { useState, useEffect } from 'react';

function CompanyHeader() {
	const routeParams = useParams<{ companyId: string }>();
	const { companyId } = routeParams;

	const { mutate: createCompany, isSuccess, isError, isPending, error } = useCreateCompany();
	const { mutate: saveCompany } = useUpdateCompany();

	const methods = useFormContext();
	const { formState, watch, getValues, reset } = methods;
	const { isValid, dirtyFields } = formState;

	const navigate = useNavigate();

	const { companyName } = watch() as Company;
	const [images, setImages] = useState([]);
	const [featuredImageId, setFeaturedImageId] = useState('');
	const [showAlert, setShowAlert] = useState(false);
	const [showErrorAlert, setShowErrorAlert] = useState(false);

	useEffect(() => {
		if (isSuccess) {
			reset();
			setShowAlert(true);

			const timer = setTimeout(() => {
				setShowAlert(false);
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [isSuccess, reset]);

	useEffect(() => {
		if (isError) {
			setShowErrorAlert(true);

			const timer = setTimeout(() => {
				setShowErrorAlert(false);
			}, 5000);

			return () => clearTimeout(timer);
		}
	}, [isError]);

	function handleSaveCompany() {
		if (companyId) {
			saveCompany({
				id: companyId,
				data: getValues() as Company
			});
		}
	}

	function handleCreateCompany() {
		const { id, createdDate, companyCode, mainCompany, ...createRequest } = getValues() as Company;
		createCompany(createRequest as CreateCompanyRequest);
	}

	return (
		<div className="flex flex-auto flex-col py-4">
			{showAlert && (
				<Alert
					severity="success"
					className="mb-6"
				>
					Compañía creada exitosamente
				</Alert>
			)}
			{showErrorAlert && (
				<Alert
					severity="error"
					className="mb-6"
				>
					Error al crear la compañía: {error?.message || 'Error desconocido'}
				</Alert>
			)}
			<div className="flex min-w-0 flex-auto flex-col gap-2 sm:flex-row sm:items-center">
				<div className="flex flex-auto items-center gap-2">
					<motion.div
						className="hidden sm:flex"
						initial={{ scale: 0 }}
						animate={{ scale: 1, transition: { delay: 0.3 } }}
					>
						{images && images.length > 0 && featuredImageId ? (
							<img
								className="w-8 rounded-sm sm:w-12"
								src={_.find(images, { id: featuredImageId })?.url}
								alt={companyName}
							/>
						) : (
							<img
								className="w-8 rounded-sm sm:w-12"
								src="/assets/images/apps/ecommerce/product-image-placeholder.png"
								alt={companyName}
							/>
						)}
					</motion.div>
					<motion.div
						className="flex min-w-0 flex-col"
						initial={{ x: -20 }}
						animate={{ x: 0, transition: { delay: 0.3 } }}
					>
						<Typography className="truncate text-lg font-semibold sm:text-2xl">
							{companyName || 'Nueva Compañía'}
						</Typography>
						<Typography
							variant="caption"
							className="font-medium"
						>
							Detalles de la compañía
						</Typography>
					</motion.div>
				</div>
				<motion.div
					className="flex w-full flex-1 justify-end"
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
				>
					{companyId !== 'new' ? (
						<>
							<Button
								className="mx-1 whitespace-nowrap"
								variant="contained"
								color="secondary"
								disabled={_.isEmpty(dirtyFields) || !isValid}
								onClick={handleSaveCompany}
							>
								Guardar
							</Button>
						</>
					) : (
						<Button
							className="mx-1 whitespace-nowrap"
							variant="contained"
							color="secondary"
							disabled={_.isEmpty(dirtyFields) || !isValid || isPending}
							onClick={handleCreateCompany}
						>
							{isPending ? 'Creando...' : 'Crear'}
						</Button>
					)}
				</motion.div>
			</div>
		</div>
	);
}

export default CompanyHeader;
