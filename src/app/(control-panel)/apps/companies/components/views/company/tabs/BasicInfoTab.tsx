import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useRegions } from '../../../../api/hooks/useRegions';
import { useEffect, useMemo } from 'react';

const COUNTRIES = [{ country: 'Colombia' }];

function BasicInfoTab() {
	const methods = useFormContext();
	const { control, formState, watch, setValue } = methods;
	const { errors } = formState;
	const { data: regions = [], isLoading: isLoadingRegions } = useRegions();

	// Sort regions alphabetically by name
	const sortedRegions = regions.sort((a, b) => a.name.localeCompare(b.name));

	// Watch region field to get municipalities
	const selectedRegionName = watch('region');
	const selectedRegion = regions.find((region) => region.name === selectedRegionName);

	const municipalities = useMemo(() => {
		return selectedRegion?.municipalities || [];
	}, [selectedRegion]);

	const sortedMunicipalities = municipalities.sort((a, b) => a.name.localeCompare(b.name));

	// Clear city when region changes
	useEffect(() => {
		if (selectedRegionName) {
			const currentCity = watch('city');
			const cityExists = municipalities.some((municipality) => municipality.name === currentCity);

			if (!cityExists) {
				setValue('city', '');
			}
		}
	}, [selectedRegionName, municipalities, setValue, watch]);

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
						<FormLabel htmlFor="phone">Teléfono</FormLabel>
						<TextField
							id="phone"
							{...field}
							type="tel"
							required
							fullWidth
							slotProps={{
								htmlInput: {
									pattern: '[0-9]*',
									inputMode: 'numeric'
								}
							}}
							error={!!errors.phone}
							helperText={errors?.phone?.message as string}
						/>
					</FormControl>
				)}
			/>

			<Controller
				name="email"
				control={control}
				render={({ field }) => (
					<FormControl className="w-full">
						<FormLabel htmlFor="email">Email</FormLabel>
						<TextField
							id="email"
							{...field}
							type="email"
							required
							fullWidth
							error={!!errors.email}
							helperText={errors?.email?.message as string}
						/>
					</FormControl>
				)}
			/>

			<Controller
				name="nit"
				control={control}
				render={({ field }) => (
					<FormControl className="w-full">
						<FormLabel htmlFor="nit">NIT</FormLabel>
						<TextField
							id="nit"
							{...field}
							fullWidth
							error={!!errors.nit}
							helperText={errors?.nit?.message as string}
						/>
					</FormControl>
				)}
			/>

			<Controller
				name="contactName"
				control={control}
				render={({ field }) => (
					<FormControl className="w-full">
						<FormLabel htmlFor="contactName">Nombre del contacto</FormLabel>
						<TextField
							id="contactName"
							{...field}
							fullWidth
							error={!!errors.contactName}
							helperText={errors?.contactName?.message as string}
						/>
					</FormControl>
				)}
			/>

			<Controller
				name="address"
				control={control}
				render={({ field }) => (
					<FormControl className="w-full">
						<FormLabel htmlFor="address">Dirección</FormLabel>
						<TextField
							id="address"
							{...field}
							fullWidth
							error={!!errors.address}
							helperText={errors?.address?.message as string}
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

			<Controller
				name="region"
				control={control}
				render={({ field }) => (
					<FormControl
						className="w-full"
						error={!!errors.region}
					>
						<FormLabel htmlFor="region">Región</FormLabel>
						<Select
							{...field}
							id="region"
							fullWidth
							disabled={isLoadingRegions}
							displayEmpty
						>
							<MenuItem value="">
								<em>Selecciona una región</em>
							</MenuItem>
							{sortedRegions.map((region) => (
								<MenuItem
									key={region.id}
									value={region.name}
								>
									{region.name}
								</MenuItem>
							))}
						</Select>
						{errors.region && <FormHelperText>{errors.region.message as string}</FormHelperText>}
					</FormControl>
				)}
			/>

			<Controller
				name="city"
				control={control}
				render={({ field }) => (
					<FormControl
						className="w-full"
						error={!!errors.city}
					>
						<FormLabel htmlFor="city">Municipio</FormLabel>
						<Select
							{...field}
							id="city"
							fullWidth
							disabled={!selectedRegionName || sortedMunicipalities.length === 0}
							displayEmpty
						>
							<MenuItem value="">
								<em>
									{!selectedRegionName ? 'Selecciona primero una región' : 'Selecciona un municipio'}
								</em>
							</MenuItem>
							{sortedMunicipalities.map((municipality) => (
								<MenuItem
									key={municipality.name}
									value={municipality.name}
								>
									{municipality.name}
								</MenuItem>
							))}
						</Select>
						{errors.city && <FormHelperText>{errors.city.message as string}</FormHelperText>}
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
							label="Empresa activa"
						/>
						{errors.isActive && <FormHelperText error>{errors.isActive.message as string}</FormHelperText>}
					</FormControl>
				)}
			/>
		</div>
	);
}

export default BasicInfoTab;
