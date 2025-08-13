'use client';

import { styled } from '@mui/material/styles';
import FusePageCarded from '@fuse/core/FusePageCarded';
import CompaniesHeader from '../ui/CompaniesHeader';
import CompaniesTable from '../ui/CompaniesTable';

const Root = styled(FusePageCarded)(() => ({
	'& .container': {
		maxWidth: '100%!important'
	}
}));

function CompaniesView() {
	return (
		<Root
			header={<CompaniesHeader />}
			content={<CompaniesTable />}
		/>
	);
}

export default CompaniesView;
