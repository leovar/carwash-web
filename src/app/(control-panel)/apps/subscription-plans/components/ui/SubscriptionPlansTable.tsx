import { styled } from '@mui/material/styles';
import { useMemo } from 'react';
import { Chip, Checkbox, Paper } from '@mui/material';
import type { MRT_ColumnDef } from 'material-react-table';
import { useNavigate } from 'react-router';
import DataTable from '@/components/data-table/DataTable';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useSubscriptionPlans } from '../../api/hooks/useSubscriptionPlans';
import { SubscriptionPlan } from '../../api/types';

const Root = styled(FusePageCarded)(() => ({
	'& .container': {
		maxWidth: '100%!important'
	}
}));

function SubscriptionPlansTable() {
	const { data: subscriptionPlans, isLoading, error } = useSubscriptionPlans();
	const navigate = useNavigate();

	const columns = useMemo<MRT_ColumnDef<SubscriptionPlan>[]>(
		() => [
			{
				accessorKey: 'name',
				header: 'Nombre',
				size: 200,
				Cell: ({ cell }) => (
					<div className="flex items-center">
						<span className="font-medium">{cell.getValue<string>()}</span>
					</div>
				)
			},
			{
				accessorKey: 'country',
				header: 'País',
				size: 120,
				Cell: ({ cell }) => (
					<Chip
						label={cell.getValue<string>()}
						size="small"
						variant="outlined"
						className="capitalize"
					/>
				)
			},
			{
				accessorKey: 'monthlyPrice',
				header: 'Precio Mensual',
				size: 150,
				Cell: ({ cell }) => {
					const price = cell.getValue<number>();
					return (
						<span className="font-mono text-sm">
							${price.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
						</span>
					);
				}
			},
			{
				accessorKey: 'annualPrice',
				header: 'Precio Anual',
				size: 150,
				Cell: ({ cell }) => {
					const price = cell.getValue<number>();
					return (
						<span className="font-mono text-sm">
							${price.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
						</span>
					);
				}
			},
			{
				accessorKey: 'licensePeriod',
				header: 'Período Licencia (meses)',
				size: 180,
				Cell: ({ cell }) => (
					<span className="text-sm">{cell.getValue<number>()} meses</span>
				)
			},
			{
				accessorKey: 'nonExpiringLicense',
				header: 'Licencia Permanente',
				size: 180,
				Cell: ({ cell }) => (
					<Checkbox
						checked={cell.getValue<boolean>()}
						disabled
						size="small"
					/>
				),
				filterFn: 'equals',
				filterSelectOptions: [
					{ label: 'Sí', value: 'true' },
					{ label: 'No', value: 'false' }
				],
				filterVariant: 'select'
			},
			{
				accessorKey: 'isActive',
				header: 'Estado',
				size: 100,
				Cell: ({ cell }) => (
					<Checkbox
						checked={cell.getValue<boolean>()}
						disabled
						size="small"
					/>
				),
				filterFn: 'equals',
				filterSelectOptions: [
					{ label: 'Activo', value: 'true' },
					{ label: 'Inactivo', value: 'false' }
				],
				filterVariant: 'select'
			},
			{
				accessorKey: 'createdDate',
				header: 'Fecha de Creación',
				size: 150,
				Cell: ({ cell }) => {
					const date = new Date(cell.getValue<string>());
					return (
						<span className="text-sm">
							{date.toLocaleDateString('es-ES', {
								day: '2-digit',
								month: '2-digit',
								year: 'numeric'
							})}
						</span>
					);
				}
			}
		],
		[]
	);

	if (isLoading) {
		return <FuseLoading />;
	}

	if (error) {
		return (
			<Root
				header={
					<div className="p-6">
						<h4>Subscription Plans</h4>
					</div>
				}
				content={
					<div className="p-6">
						<div className="text-red-500">Error loading subscription plans: {error.message}</div>
					</div>
				}
			/>
		);
	}

	return (
		<Paper
			className="flex h-full w-full flex-auto flex-col overflow-hidden rounded-b-none"
			elevation={2}
		>
			<DataTable
				columns={columns}
				data={subscriptionPlans || []}
				enableRowSelection={false}
				enableRowActions={false}
				initialState={{
					density: 'compact',
					showColumnFilters: false,
					showGlobalFilter: true,
					sorting: [
						{
							id: 'name',
							desc: false
						}
					]
				}}
				muiTableBodyRowProps={({ row }) => ({
					onClick: () => navigate(`/apps/subscription-plans/${row.original.id}`),
					sx: {
						cursor: 'pointer',
						'&:hover': {
							backgroundColor: 'action.hover'
						}
					}
				})}
			/>
		</Paper>
	);
}

export default SubscriptionPlansTable;