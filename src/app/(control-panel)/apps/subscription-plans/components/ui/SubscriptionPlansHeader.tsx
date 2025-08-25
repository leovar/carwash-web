import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

function SubscriptionPlansHeader() {
	const navigate = useNavigate();

	return (
		<div className="p-6 w-full flex flex-col sm:flex-row flex-auto justify-between">
			<div className="flex items-center">
				<FuseSvgIcon
					className="text-48"
					size={32}
				>
					lucide:credit-card
				</FuseSvgIcon>
				<h4 className="ml-2 text-2xl font-extrabold tracking-tight leading-none">
					Planes de Suscripción
				</h4>
			</div>
			<div className="flex items-center mt-4 sm:mt-0 sm:ml-8 space-x-2">
				<Button
					variant="contained"
					color="secondary"
					startIcon={<FuseSvgIcon>lucide:plus</FuseSvgIcon>}
					onClick={() => navigate('/apps/subscription-plans/new')}
				>
					Crear Plan
				</Button>
			</div>
		</div>
	);
}

export default SubscriptionPlansHeader;