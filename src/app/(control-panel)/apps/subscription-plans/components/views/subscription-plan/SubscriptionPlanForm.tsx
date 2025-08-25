import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const COUNTRIES = [{ country: 'Colombia' }];

function SubscriptionPlanForm() {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

	return (
		<div className="flex flex-col gap-4">
			<Controller
				name="name"
				control={control}
				render={({ field }) => (
					<FormControl className="w-full">
						<FormLabel htmlFor="name">Nombre del Plan</FormLabel>
						<TextField
							id="name"
							{...field}
							required
							autoFocus
							fullWidth
							error={!!errors.name}
							helperText={errors?.name?.message as string}
						/>
					</FormControl>
				)}
			/>

			<Controller
				name="country"
				control={control}
				render={({ field }) => (
					<FormControl
						className="w-full"
						error={!!errors.country}
					>
						<FormLabel htmlFor="country">País</FormLabel>
						<Select
							{...field}
							id="country"
							fullWidth
							required
							displayEmpty
						>
							<MenuItem value="">
								<em>Selecciona un país</em>
							</MenuItem>
							{COUNTRIES.map((countryObj) => (
								<MenuItem
									key={countryObj.country}
									value={countryObj.country}
								>
									{countryObj.country}
								</MenuItem>
							))}
						</Select>
						{errors.country && <FormHelperText>{errors.country.message as string}</FormHelperText>}
					</FormControl>
				)}
			/>

			<div className="flex gap-4">
				<Controller
					name="monthlyPrice"
					control={control}
					render={({ field }) => (
						<FormControl className="w-full">
							<FormLabel htmlFor="monthlyPrice">Precio Mensual</FormLabel>
							<TextField
								id="monthlyPrice"
								{...field}
								type="number"
								required
								fullWidth
								slotProps={{
									htmlInput: {
										min: 0,
										step: 0.01
									}
								}}
								onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
								error={!!errors.monthlyPrice}
								helperText={errors?.monthlyPrice?.message as string}
							/>
						</FormControl>
					)}
				/>

				<Controller
					name="annualPrice"
					control={control}
					render={({ field }) => (
						<FormControl className="w-full">
							<FormLabel htmlFor="annualPrice">Precio Anual</FormLabel>
							<TextField
								id="annualPrice"
								{...field}
								type="number"
								required
								fullWidth
								slotProps={{
									htmlInput: {
										min: 0,
										step: 0.01
									}
								}}
								onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
								error={!!errors.annualPrice}
								helperText={errors?.annualPrice?.message as string}
							/>
						</FormControl>
					)}
				/>
			</div>

			<Controller
				name="licensePeriod"
				control={control}
				render={({ field }) => (
					<FormControl className="w-full">
						<FormLabel htmlFor="licensePeriod">Período de Licencia (meses)</FormLabel>
						<TextField
							id="licensePeriod"
							{...field}
							type="number"
							required
							fullWidth
							slotProps={{
								htmlInput: {
									min: 1,
									step: 1
								}
							}}
							onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
							error={!!errors.licensePeriod}
							helperText={errors?.licensePeriod?.message as string}
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

			<Controller
				name="nonExpiringLicense"
				control={control}
				render={({ field }) => (
					<FormControl className="w-full">
						<FormControlLabel
							control={
								<Checkbox
									{...field}
									checked={field.value || false}
									onChange={(e) => field.onChange(e.target.checked)}
								/>
							}
							label="Licencia sin vencimiento"
						/>
						{errors.nonExpiringLicense && <FormHelperText error>{errors.nonExpiringLicense.message as string}</FormHelperText>}
					</FormControl>
				)}
			/>

			<Controller
				name="isActive"
				control={control}
				render={({ field }) => (
					<FormControl className="w-full">
						<FormControlLabel
							control={
								<Checkbox
									{...field}
									checked={field.value || false}
									onChange={(e) => field.onChange(e.target.checked)}
								/>
							}
							label="Plan activo"
						/>
						{errors.isActive && <FormHelperText error>{errors.isActive.message as string}</FormHelperText>}
					</FormControl>
				)}
			/>
		</div>
	);
}

export default SubscriptionPlanForm;