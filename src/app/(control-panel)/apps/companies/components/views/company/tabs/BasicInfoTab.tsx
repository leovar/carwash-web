import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function BasicInfoTab() {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

	return (
		<div className="flex flex-col gap-4">
			<Controller
				name="companyName"
				control={control}
				render={({ field }) => (
					<FormControl className="w-full">
						<FormLabel htmlFor="companyName">Nombre</FormLabel>
						<TextField
							id="companyName"
							{...field}
							required
							autoFocus
							fullWidth
							error={!!errors.companyName}
							helperText={errors?.name?.message as string}
						/>
					</FormControl>
				)}
			/>

			<Controller
				name="phone"
				control={control}
				render={({ field }) => (
					<FormControl className="w-full">
						<FormLabel htmlFor="phone">Telefono</FormLabel>
						<TextField
							id="phone"
							{...field}
							fullWidth
							error={!!errors.phone}
							helperText={errors?.name?.message as string}
						/>
					</FormControl>
				)}
			/>

			<Controller
				name="description"
				control={control}
				render={({ field }) => (
					<FormControl className="w-full">
						<FormLabel htmlFor="description">Descripción</FormLabel>
						<TextField
							{...field}
							id="description"
							type="text"
							multiline
							rows={3}
							fullWidth
							error={!!errors.description}
							helperText={errors?.description?.message as string}
						/>
					</FormControl>
				)}
			/>
		</div>
	);
}

export default BasicInfoTab;
