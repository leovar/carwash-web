'use client';

import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'motion/react';
import { SyntheticEvent, useEffect, useState } from 'react';
import useParams from '@fuse/hooks/useParams';
import Link from '@fuse/core/Link';
import _ from 'lodash';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CompanyHeader from '../../ui/CompanyHeader';
import BasicInfoTab from './tabs/BasicInfoTab';
import LicenceInfoTab from './tabs/LicenceInfoTab';
import ContactsInfoTab from './tabs/ContactsInfoTab';
import { useCompany } from '../../../api/hooks/useCompany';
import { Tabs, Tab } from '@mui/material';
import CompanyModel from '../../../models/CompanyModel';

/**
 * Form Validation Schema
 */
const schema = z.object({
	companyName: z
		.string()
		.nonempty('Debes ingresar un nombre de empresa')
		.min(2, 'El nombre de la empresa debe tener al menos 2 caracteres')
});

function Company() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const routeParams = useParams();

	const { companyId } = routeParams as { companyId: string };

	const { data: company, isLoading, isError } = useCompany(companyId);

	const [tabValue, setTabValue] = useState('basic-info');

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});

	const { reset, watch } = methods;

	const form = watch();

	useEffect(() => {
		if (companyId === 'new') {
			reset(CompanyModel({}));
		}
	}, [companyId, reset]);

	useEffect(() => {
		if (company) {
			reset({ ...company });
		}
	}, [company, reset]);

	/**
	 * Tab Change
	 */
	function handleTabChange(event: SyntheticEvent, value: string) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested products is not exists
	 */
	if (isError && companyId !== 'new') {
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
					No existe la compañía!
				</Typography>
				<Button
					className="mt-6"
					component={Link}
					variant="outlined"
					to="/apps/companies"
					color="inherit"
				>
					Ir a página de compañias
				</Button>
			</motion.div>
		);
	}

	/**
	 * Wait while product data is loading and form is setted
	 */
	if (_.isEmpty(form) || (company && routeParams.companyId !== company.id && routeParams.companyId !== 'new')) {
		return <FuseLoading />;
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<CompanyHeader />}
				content={
					<div className="flex max-w-3xl flex-col gap-6 p-4 sm:p-6">
						<Tabs
							value={tabValue}
							onChange={handleTabChange}
						>
							<Tab
								value="basic-info"
								label="Información Basica"
							/>
							<Tab
								value="licence-info"
								label="Licencia"
							/>
							<Tab
								value="contacts-info"
								label="Contactos"
							/>
						</Tabs>
						<div className="">
							<div className={tabValue !== 'basic-info' ? 'hidden' : ''}>
								<BasicInfoTab />
							</div>

							<div className={tabValue !== 'licence-info' ? 'hidden' : ''}>
								<LicenceInfoTab />
							</div>

							<div className={tabValue !== 'contacts-info' ? 'hidden' : ''}>
								<ContactsInfoTab />
							</div>
						</div>
					</div>
				}
				scroll={isMobile ? 'page' : 'content'}
			/>
		</FormProvider>
	);
}

export default Company;
