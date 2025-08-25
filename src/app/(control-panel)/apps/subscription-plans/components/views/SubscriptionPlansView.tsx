'use client';

import { styled } from '@mui/material/styles';
import FusePageCarded from '@fuse/core/FusePageCarded';
import SubscriptionPlansHeader from '../ui/SubscriptionPlansHeader';
import SubscriptionPlansTable from '../ui/SubscriptionPlansTable';

const Root = styled(FusePageCarded)(() => ({
	'& .container': {
		maxWidth: '100%!important'
	}
}));

function SubscriptionPlansView() {
	return (
		<Root
			header={<SubscriptionPlansHeader />}
			content={<SubscriptionPlansTable />}
		/>
	);
}

export default SubscriptionPlansView;