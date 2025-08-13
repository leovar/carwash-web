import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'motion/react';
import { useFormContext } from 'react-hook-form';
import useParams from '@fuse/hooks/useParams';
import _ from 'lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import useNavigate from '@fuse/hooks/useNavigate';
import { useCreateCompany } from '../../api/hooks/useCreateCompany';
import { useUpdateCompany } from '../../api/hooks/useUpdateCompany';
import { Company } from '../../api/types';
import { useState } from 'react';

function CompanyHeader() {
	const routeParams = useParams<{ companyId: string }>();
	const { companyId } = routeParams;

	const { mutate: createCompany } = useCreateCompany();
	const { mutate: saveCompany } = useUpdateCompany();

	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;

	const navigate = useNavigate();

	const { companyName } = watch() as Company;
	const [images, setImages] = useState([]);
	const [featuredImageId, setFeaturedImageId] = useState('');

	function handleSaveCompany() {
		if (companyId) {
			saveCompany({
				id: companyId,
				data: getValues() as Company
			});
		}
	}

	function handleCreateCompany() {
		createCompany(getValues() as Company);
	}

	return (
		<div className="flex flex-auto flex-col py-4">
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
							disabled={_.isEmpty(dirtyFields) || !isValid}
							onClick={handleCreateCompany}
						>
							Crear
						</Button>
					)}
				</motion.div>
			</div>
		</div>
	);
}

export default CompanyHeader;
