import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import _ from 'lodash';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@fuse/core/Link';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import useJwtAuth from '../useJwtAuth';

/**
 * Form Validation Schema
 */
const schema = z.object({
	email: z.string().email('Debes ingresar un email válido').nonempty('Debe ingresar un email'),
	password: z
		.string()
		.min(4, 'Contraseña muy corta - debe tener al menos 4 caraceres.')
		.nonempty('Por favor ingrese una contraseña.'),
	remember: z.boolean().optional()
});

type FormType = z.infer<typeof schema>;

const defaultValues: FormType = {
	email: '',
	password: '',
	remember: true
};

function JwtSignInForm() {
	const { signIn } = useJwtAuth();

	const { control, formState, handleSubmit, setError } = useForm<FormType>({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	function onSubmit(formData: FormType) {
		const { email, password } = formData;

		signIn({
			email,
			password
		}).catch(async (error) => {
			// Handle HTTPError from ky with JSON response
			if (error?.response && typeof error.response.json === 'function') {
				try {
					const errorData = await error.response.json();
					// If API returns { message: "Credenciales inválidas", error: "Unauthorized", statusCode: 401 }

					if (errorData?.message) {
						setError('root', {
							type: 'manual',
							message: errorData.message
						});
						return;
					}
				} catch {
					// If JSON parsing fails, fall back to generic error
				}
			}

			// Fallback for other error formats or legacy error handling
			const errorData = error?.data as {
				type: 'email' | 'password' | 'remember' | `root.${string}` | 'root';
				message: string;
			}[];

			if (errorData?.length > 0) {
				errorData.forEach((err) => {
					setError(err.type, {
						type: 'manual',
						message: err.message
					});
				});
			} else {
				// Generic error message if no specific format is found
				setError('root', {
					type: 'manual',
					message: 'Error de autenticación. Verifique sus credenciales.'
				});
			}
		});
	}

	return (
		<form
			name="loginForm"
			noValidate
			className="flex w-full flex-col justify-center"
			onSubmit={handleSubmit(onSubmit)}
		>
			{errors.root && (
				<Alert
					severity="error"
					className="mb-6"
				>
					{errors.root.message}
				</Alert>
			)}

			<Controller
				name="email"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-6"
						label="Email"
						autoFocus
						type="email"
						error={!!errors.email}
						helperText={errors?.email?.message}
						variant="outlined"
						required
						fullWidth
					/>
				)}
			/>

			<Controller
				name="password"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-6"
						label="Password"
						type="password"
						error={!!errors.password}
						helperText={errors?.password?.message}
						variant="outlined"
						required
						fullWidth
					/>
				)}
			/>

			<div className="flex hidden flex-col items-center justify-center sm:flex-row sm:justify-between">
				<Controller
					name="remember"
					control={control}
					render={({ field }) => (
						<FormControl>
							<FormControlLabel
								label="Remember me"
								control={
									<Checkbox
										size="small"
										{...field}
									/>
								}
							/>
						</FormControl>
					)}
				/>

				<Link
					className="text-md font-medium"
					to="/#"
				>
					Forgot password?
				</Link>
			</div>

			<Button
				variant="contained"
				color="secondary"
				className="mt-4 w-full"
				aria-label="Sign in"
				disabled={_.isEmpty(dirtyFields) || !isValid}
				type="submit"
				size="large"
			>
				Sign in
			</Button>
		</form>
	);
}

export default JwtSignInForm;
