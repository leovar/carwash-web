import { styled } from '@mui/material/styles';
import { useMemo } from 'react';
import { Chip, Checkbox, ListItemIcon, MenuItem, Paper } from '@mui/material';
import type { MRT_ColumnDef } from 'material-react-table';
import DataTable from '@/components/data-table/DataTable';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useCompanies } from '../../api/hooks/useCompanies';
import { Company } from '../../api/types';

const Root = styled(FusePageCarded)(() => ({
	'& .container': {
		maxWidth: '100%!important'
	}
}));

function CompaniesTable() {
	const { data: companies, isLoading, error } = useCompanies();

	const columns = useMemo<MRT_ColumnDef<Company>[]>(
		() => [
			{
				accessorKey: 'companyName',
				header: 'Company Name',
				size: 200,
				Cell: ({ cell }) => (
					<div className="flex items-center">
						<span className="font-medium">{cell.getValue<string>()}</span>
					</div>
				)
			},
			{
				accessorKey: 'licenseType',
				header: 'License Type',
				size: 150,
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
				accessorKey: 'isActive',
				header: 'Status',
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
					{ label: 'Active', value: 'true' },
					{ label: 'Inactive', value: 'false' }
				],
				filterVariant: 'select'
			},
			{
				accessorKey: 'phone',
				header: 'Phone',
				size: 150,
				Cell: ({ cell }) => <span className="font-mono text-sm">{cell.getValue<string>()}</span>
			},
			{
				accessorKey: 'endDate',
				header: 'End Date',
				size: 120,
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
			},
			{
				accessorKey: 'creationDate',
				header: 'Creation Date',
				size: 120,
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
						<h4>Companies</h4>
					</div>
				}
				content={
					<div className="p-6">
						<div className="text-red-500">Error loading companies: {error.message}</div>
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
				data={companies || []}
				enableRowSelection={false}
				enableRowActions={false}
				initialState={{
					density: 'compact',
					showColumnFilters: false,
					showGlobalFilter: true,
					sorting: [
						{
							id: 'companyName',
							desc: false
						}
					]
				}}
			/>
		</Paper>
	);
}

export default CompaniesTable;
