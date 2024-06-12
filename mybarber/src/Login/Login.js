//Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ThemeProvider } from '@mui/material/styles';

import axios from 'axios'
import logo from './barberlogo.png';
import theme from './LoginTheme.js'
import './Login.css';

function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [nomeGuest, setNomeGuest] = useState('')
	const [cognomeGuest, setCognomeGuest] = useState('')
	const [dataNascitaGuest, setDataNascitaGuest] = useState('')

	const [nomeReg, setNomeReg] = useState('')
	const [cognomeReg, setCognomeReg] = useState('')
	const [dataNascitaReg, setDataNascitaReg] = useState('')
	const [emailReg, setEmailReg] = useState('')
	const [passwordReg, setPasswordReg] = useState('')

	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	const [showNewBox, setShowNewBox] = useState(false); // Stato per controllare la visualizzazione del nuovo riquadro

	const toggleNewBox = () => {
		setShowNewBox(!showNewBox);
	};

	const hideNewBox = () => {
		setShowNewBox(false);
	};

	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		// Controlla se l'email contiene un dominio specifico per i barbieri
		if (email.includes('@mybarber.com')) {
			// Se l'email contiene il dominio per i barbieri, imposta il tipo di utente a 'barber'
			axios.post("http://localhost:8081/barber", { email, password })
				.then(res => {
					if (res.data.message === "Success") {
						const { nome, cognome, email } = res.data.barber;
						navigate('/barberhome', { state: { barberData: { nome, cognome, email } } });
					} else if (res.data === "Failed") {
						alert("Email o Password errate");
					} else if (res.data === "NoEInsert") {
						alert("Email non inserita");
					} else if (res.data === "NoPInsert") {
						alert("Password non inserita");
					}
				})
				.catch(err => console.log(err));

		} else {
			// Altrimenti, considera l'utente come cliente
			axios.post("http://localhost:8081/login", { email, password })
				.then(res => {
					if (res.data.message === "Success") {
						const { nome, cognome, email } = res.data.client;
						navigate('/Home', { state: { clientData: { nome, cognome, email } } });
						console.log(res);
					} else if (res.data === "Failed") {
						alert("Email o Password errate");
					} else if (res.data === "NoEInsert") {
						alert("Email non inserita");
					} else if (res.data === "NoPInsert") {
						alert("Password non inserita");
					}
				})
				.catch(err => console.log(err));
		}
	}

	const handleSubmitGuest = (event) => {
		event.preventDefault();
		axios.post("http://localhost:8081/guest", { nomeGuest, cognomeGuest, dataNascitaGuest })
			.then(res => {
				if (res.data.message === "Success") {
					const { nome, cognome } = res.data;
					navigate('/gome', { state: { guestData: { nome, cognome } } });

					console.log(res);
				} else {
					console.log("Errore durante la prenotazione come guest");
				}

			})
			.catch(err => console.log(err));
	}

	const handleSubmitReg = (event) => {
		event.preventDefault();
		axios.post("http://localhost:8081/registrazione", { nomeReg, cognomeReg, dataNascitaReg, emailReg, passwordReg })
			.then(res => {

				hideNewBox();
			})
			.catch(err => console.log(err));

	}
	return (
		<div className="grid-container">
			<h1 className="App-header">
				MyBarber
			</h1>
			<div className="riquadro1">
				<h5>  Accedi </h5>

				<ThemeProvider theme={theme}>

					<FormControl variant="filled" style={{ width: 255 }} onChange={e => setEmail(e.target.value)}>
						<InputLabel htmlFor="filled-adornment" name='email'>Username o email</InputLabel>
						<FilledInput
							id="filled-adornment"
						/>
					</FormControl>

					<div style={{ marginTop: '15px' }} />
					<FormControl variant="filled" onChange={e => setPassword(e.target.value)}>
						<InputLabel htmlFor="filled-adornment-password" name='password' >Password</InputLabel>

						<FilledInput
							id="filled-adornment-password"
							type={showPassword ? 'text' : 'password'}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
					<div style={{ marginTop: '5px' }} />
					<Button onClick={handleSubmit} variant="login">Login</Button>
				</ThemeProvider>
				<a className="Registrati" href="#" onClick={toggleNewBox}>Registrati </a>
			</div>

			{showNewBox && ( // Renderizza il nuovo riquadro solo se showNewBox è true
				<div className="riquadroNuovo">
					<h5>Registrati</h5>
					<ThemeProvider theme={theme}>
						<div style={{ marginTop: '-43px' }} />
						<FormControl variant="filled" style={{ width: 258 }} onChange={e => setNomeReg(e.target.value)}>
							<InputLabel htmlFor="filled-adornment" name='nomeReg'>Nome</InputLabel>
							<FilledInput id="filled-adornment" />
						</FormControl>

						<div style={{ marginTop: '5px' }} />
						<FormControl variant="filled" style={{ width: 258 }} onChange={e => setCognomeReg(e.target.value)}>
							<InputLabel htmlFor="filled-adornment" name='cognomeReg'>Cognome</InputLabel>
							<FilledInput id="filled-adornment" />
						</FormControl>

						<div style={{ marginTop: '5px' }} />
						<FormControl variant="filled" style={{ width: 258 }} onChange={e => setDataNascitaReg(e.target.value)}>
							<InputLabel htmlFor="filled-adornment" name='dataNascitaReg' >Data di nascita</InputLabel>
							<FilledInput id="filled-adornment" placeholder='DD/MM/YYYY' />
						</FormControl>

						<div style={{ marginTop: '5px' }} />
						<FormControl variant="filled" style={{ width: 258 }} onChange={e => setEmailReg(e.target.value)}>
							<InputLabel htmlFor="filled-adornment" name='emailReg'>Email</InputLabel>
							<FilledInput id="filled-adornment" />
						</FormControl>

						<div style={{ marginTop: '5px' }} />
						<FormControl variant="filled" style={{ width: 258 }} onChange={e => setPasswordReg(e.target.value)}>
							<InputLabel htmlFor="filled-adornment-password" name='passwordReg'>Password</InputLabel>
							<FilledInput
								id="filled-adornment-password"
								type={showPassword ? 'text' : 'password'}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
						<div style={{ marginTop: '0px' }} />
						<Button onClick={handleSubmitReg} variant="registrazione">Registrati</Button>
					</ThemeProvider>
				</div>
			)}

			<img src={logo} className="App-logo" alt="logo" />

			<div className="riquadro2">
				<h5>Ospite</h5>
				<ThemeProvider theme={theme}>
					<div style={{ marginTop: '-10px' }} />
					<FormControl variant="filled" style={{ width: 258 }} onChange={e => setNomeGuest(e.target.value)}>
						<InputLabel htmlFor="filled-adornment" name='nomeGuest'>Nome</InputLabel>
						<FilledInput id="filled-adornment" />
					</FormControl>

					<div style={{ marginTop: '10px' }} />
					<FormControl variant="filled" style={{ width: 258 }} onChange={e => setCognomeGuest(e.target.value)}>
						<InputLabel htmlFor="filled-adornment" name='cognomeGuest'>Cognome</InputLabel>
						<FilledInput id="filled-adornment" />
					</FormControl>

					<div style={{ marginTop: '10px' }} />
					<FormControl variant="filled" style={{ width: 258 }} onChange={e => setDataNascitaGuest(e.target.value)}>
						<InputLabel htmlFor="filled-adornment" name='daNascitaGuest' >Data di nascita</InputLabel>
						<FilledInput id="filled-adornment" placeholder='DD/MM/YYYY' />
					</FormControl>

					<div style={{ marginTop: '5px' }} />

					<Button onClick={handleSubmitGuest} variant="login">Login</Button>

				</ThemeProvider>
			</div>


		</div>
	);
};

export default Login