import React, {useEffect, useState} from 'react';
import {
	Box,
	Container,
	Grid,
	Stack,
	TextField,
	FormControl,
	InputLabel,
	InputAdornment,
	OutlinedInput,
	IconButton,
	Autocomplete,
	MenuItem,
	Select,
	Button,
	Alert,
} from '@mui/material';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';

import {createContract, updateUser} from '../../functions/requests';
import {useRouter} from 'next/router';
//Diccionaries
import en from '../../../public/languages/en';
import es from '../../../public/languages/es';
import {getDate, getMonth, getYear} from 'date-fns';
const UserContractForm = ({title, initialUserData}) => {
	const [showPassword, setShowPassword] = React.useState(false);
	const [isSuccess, setIsSuccess] = useState(null);
	const [isWarning, setIsWarning] = useState(null);

	const [userData, setUserData] = React.useState({
		contract_number: '',
		start_contract: '',
		service: '',
		service_description: '',
		postal_code: '',
		city: '',
		neighborhood: '',
		type_of_avenue: '',
		first_number: '',
		second_number: '',
		stratum_social: '',
		n_electric_transformer: '',
		transformer_property: '',
		type_of_conection: '',
	});

	const router = useRouter();
	const {userId} = router.query;
	const {locale} = router;
	const t = locale === 'en' ? en : es;

	const handleChangeUser = (value, type) => {
		if (type == 'start_contract') {
			let year = getYear(value);
			let month = getMonth(value) + 1 < 10 ? `0${getMonth(value) + 1}` : getMonth(value);
			let day = getDate(value) < 10 ? `0${getDate(value)}` : getDate(value);

			let formattedDate = `${year}-${month}-${day}`;
			value = formattedDate;
		}

		setUserData({...userData, [type]: value});
	};

	const handleRegisterUser = async () => {
		if (
			!userData.contract_number ||
			!userData.start_contract ||
			!userData.service ||
			!userData.service_description ||
			!userData.postal_code ||
			!userData.city ||
			!userData.neighborhood ||
			!userData.type_of_avenue ||
			!userData.first_number ||
			!userData.second_number ||
			!userData.stratum_social ||
			!userData.n_electric_transformer ||
			!userData.transformer_property ||
			!userData.type_of_conection
		) {
			setIsWarning(t.ContractForm.handleCreateContract.warningNoFields);
			return;
		}

		try {
			const res = await createContract(userId, userData);
			// console.log('CREATE CONTRACT');
			setIsSuccess(t.ContractForm.handleCreateContract.Success);
		} catch (err) {
			setIsWarning(t.ContractForm.handleCreateContract.Warning);
		}
	};

	// Set initial user data
	useEffect(() => {
		if (initialUserData) {
			setUserData({...initialUserData, password: '123'});
		}
	}, []);

	console.log(userData);

	return (
		<>
			<h1 className="font-black text-4xl ml-16">{title}</h1>
			<form>
				<Grid container justifyContent="space-evenly" alignItems="center">
					<Grid item xs={5} sx={{m: 2}}>
						<TextField
							value={userData.contract_number}
							onChange={(e) => handleChangeUser(e.target.value, 'contract_number')}
							id="contract_number"
							label={t.ContractForm.contractNumber}
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={5} sx={{m: 2}}>
						<DesktopDatePicker
							sx={{color: 'black'}}
							label={t.ContractForm.startContract}
							inputFormat="yyyy/mm/dd"
							value={userData.start_contract}
							onChange={(pickedDate) => handleChangeUser(pickedDate, 'start_contract')}
							renderInput={(params) => <TextField {...params} />}
						/>
						{/* <TextField
							value={userData.start_contract}
							onChange={(e) => handleChangeUser(e.target.value, 'start_contract')}
							id="start_contract"
							label={t.ContractForm.startContract}
							variant="outlined"
							fullWidth
						/> */}
					</Grid>
					<Grid item xs={5} sx={{m: 2}}>
						<TextField
							value={userData.service}
							onChange={(e) => handleChangeUser(e.target.value, 'service')}
							id="service"
							label={t.ContractForm.service}
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={5} sx={{m: 2}}>
						<TextField
							value={userData.service_description}
							onChange={(e) => handleChangeUser(e.target.value, 'service_description')}
							id="service_description"
							label={t.ContractForm.serviceDescription}
							variant="outlined"
							fullWidth
						/>
					</Grid>

					<Grid item xs={5} sx={{m: 2}}>
						<TextField
							value={userData.postal_code}
							onChange={(e) => handleChangeUser(e.target.value, 'postal_code')}
							id="postal_code"
							label={t.ContractForm.postalCode}
							variant="outlined"
							fullWidth
						/>
					</Grid>

					<Grid item xs={5} sx={{m: 2}}>
						<Autocomplete
							value={userData.city}
							onChange={(event, value) => handleChangeUser(value, 'city')}
							disablePortal
							id="city"
							options={['Cali', 'Jamundi', 'Bogota', 'Cartagena', 'Candelaria']}
							fullWidth
							renderInput={(params) => <TextField {...params} label={t.ContractForm.city} />}
						/>
					</Grid>

					<Grid item xs={5} sx={{m: 2}}>
						<TextField
							value={userData.neighborhood}
							onChange={(e) => handleChangeUser(e.target.value, 'neighborhood')}
							id="neighborhood"
							label={t.ContractForm.neighbourhood}
							variant="outlined"
							fullWidth
						/>
					</Grid>

					<Grid item xs={5} sx={{m: 2}}>
						<TextField
							value={userData.type_of_avenue}
							onChange={(e) => handleChangeUser(e.target.value, 'type_of_avenue')}
							id="type_of_avenue"
							label={t.ContractForm.typeOfAvenue}
							variant="outlined"
							fullWidth
						/>
					</Grid>

					<Grid item xs={5} sx={{m: 2}}>
						<TextField
							value={userData.first_number}
							onChange={(e) => handleChangeUser(e.target.value, 'first_number')}
							id="first_number"
							label={t.ContractForm.firstNumber}
							type="number"
							variant="outlined"
							fullWidth
						/>
					</Grid>

					<Grid item xs={5} sx={{m: 2}}>
						<TextField
							value={userData.second_number}
							onChange={(e) => handleChangeUser(e.target.value, 'second_number')}
							id="second_number"
							label={t.ContractForm.secondNumber}
							type="number"
							variant="outlined"
							fullWidth
						/>
					</Grid>

					<Grid item xs={5} sx={{m: 2}}>
						<TextField
							value={userData.stratum_social}
							onChange={(e) => handleChangeUser(e.target.value, 'stratum_social')}
							id="stratum_social"
							label={t.ContractForm.stratumSocial}
							type="number"
							variant="outlined"
							InputProps={{inputProps: {min: 1, max: 6}}}
							inputProps={{maxLength: 1}}
							fullWidth
						/>
					</Grid>

					<Grid item xs={5} sx={{m: 2}}>
						<TextField
							value={userData.n_electric_transformer}
							onChange={(e) => handleChangeUser(e.target.value, 'n_electric_transformer')}
							id="n_electric_transformer"
							label={t.ContractForm.numberElectricTranformer}
							type="number"
							variant="outlined"
							fullWidth
						/>
					</Grid>

					<Grid item xs={5} sx={{m: 2}}>
						<TextField
							value={userData.transformer_property}
							onChange={(e) => handleChangeUser(e.target.value, 'transformer_property')}
							id="transformer_property"
							label={t.ContractForm.transformerProperty}
							variant="outlined"
							fullWidth
						/>
					</Grid>

					<Grid item xs={5} sx={{m: 2}}>
						<FormControl fullWidth>
							<InputLabel id="type_of_conection">{t.ContractForm.typeOfConnection}</InputLabel>
							<Select
								labelId="type_of_conection"
								id="type_of_conection"
								value={userData.type_of_conection}
								label={t.ContractForm.typeOfConnection}
								onChange={(e) => handleChangeUser(e.target.value, 'type_of_conection')}
							>
								<MenuItem value={t.ContractForm.interiorTypeOfConnection}>{t.ContractForm.interiorTypeOfConnection}</MenuItem>
								<MenuItem value={t.ContractForm.exteriorTypeOfConnection}>{t.ContractForm.exteriorTypeOfConnection}</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid item xs={12} sx={{m: 2}} align="center">
						<Button size="large" variant="contained" onClick={() => handleRegisterUser()}>
							{t.ContractForm.buttonCreateContract}
						</Button>
						{isSuccess && <Alert severity="success">{isSuccess}</Alert>}
						{isWarning && <Alert severity="error">{isWarning}</Alert>}
					</Grid>
				</Grid>
			</form>
		</>
	);
};

export default UserContractForm;
