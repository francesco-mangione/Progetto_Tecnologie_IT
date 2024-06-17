import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Tooltip, IconButton } from '@mui/material';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import './barberpage.css';
import theme from './barbertheme.js';
import { ThemeProvider } from '@mui/material/styles';
import DraftsIcon from '@mui/icons-material/Drafts';
import axios from 'axios';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
	{ id: 'servizio', label: 'Servizio', minWidth: 170 },
	{ id: 'nome', label: 'Nome', minWidth: 170 },
	{ id: 'cognome', label: 'Cognome', minWidth: 170 },
	{ id: 'data', label: 'Data', minWidth: 170 },
	{ id: 'ora', label: 'Ora', minWidth: 170 },
	{ id: 'actions', label: 'Azioni', minWidth: 100 },
];

export default function Barbermain() {
	const location = useLocation();
	const barberData = location.state?.barberData;

	const [rows, setRows] = useState([]);

	const handleDelete = (day, time) => {
		axios.delete("http://localhost:8081/delete", {
			data: {
				giorno: day,
				ora: time
			}
		})
			.then(res => {
				console.log("Prenotazione eliminata con successo:", res.data);
				// Aggiorna la lista delle prenotazioni dopo l'eliminazione
				setRows(rows.filter(row => !(row.data === day && row.ora === time)));
			})
			.catch(err => console.error("Errore durante l'eliminazione della prenotazione:", err));
		window.location.reload();
	};

	useEffect(() => {
		axios.get("http://localhost:8081/barbertable")
			.then(response => {
				const extractedData = response.data.map(row => ({
					servizio: row.Richiesta,
					nome: row.Nome,
					cognome: row.Cognome,
					data: row.Giorno,
					ora: row.Ora
				}));
				
				
				
				setRows(extractedData);
			})
			.catch(error => {
				console.error("Errore durante la richiesta:", error);
			});
	}, []);

	const [showAccount, setShowAccount] = React.useState(false);

	const toggleAccount = () => {
		setShowAccount(!showAccount);
	};

	return (
		<ThemeProvider theme={theme}>
			<div className="grid-container">
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '40px', marginBottom: '-70px' }}>
					<h1 className="App-header">
						MyBarber
					</h1>
					<Tooltip>
						<IconButton onClick={toggleAccount} sx={{ marginTop: '-60px', display: 'flex' }}>
							<AccountCircleIcon />
							<ContentCutIcon sx={{ display: 'flex', position: 'absolute', right: 10, opacity: 0 }} />
						</IconButton>
					</Tooltip>

					{showAccount && (
						<div className="account">
							<List sx={{ width: '100%', maxWidth: 360 }} component="nav">
								<ListItemButton>
									<ListItemIcon>
										<AccountCircleIcon sx={{ color: '#36d3cf' }} />
									</ListItemIcon>
									<ListItemText primary={`${barberData.nome} ${barberData.cognome}`} />
								</ListItemButton>
								<ListItemButton>
									<ListItemIcon>
										<DraftsIcon sx={{ color: '#36d3cf' }} />
									</ListItemIcon>
									<ListItemText primary={barberData.email} />
								</ListItemButton>
							</List>
						</div>
					)}
				</div>

				<div className="scroll-container">
					<Paper sx={{ marginLeft: '150px', width: '80%', height: '82%', borderRadius: '10px', backgroundColor: '#949494' }}>
						<TableContainer sx={{ maxHeight: 480 }}>
							<Table stickyHeader aria-label="sticky table">
								<TableHead >
									<TableRow>
										{columns.map((column) => (
											<TableCell
												key={column.id}
												style={{ minWidth: column.minWidth, backgroundColor: '#1f1f1f', color: '#fff' }}
											>
												{column.label}
											</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{rows.map((row, index) => (
										<TableRow hover role="checkbox" tabIndex={-1} key={index}>
											{columns.map((column) => (
												<TableCell key={column.id} align={column.align}>
													{column.id !== 'actions' ? (
														row[column.id]
													) : (
														<List component="div" disablePadding>
															<ListItemButton onClick={() => handleDelete(row.data, row.ora)}>
																<ListItemIcon>
																	<DeleteIcon sx={{ marginLeft: '25px', color: 'red' }} />
																</ListItemIcon>
															</ListItemButton>
														</List>
													)}
												</TableCell>
											))}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>
				</div>
			</div>
		</ThemeProvider>
	);
};
