// Homepage.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Radio, RadioGroup, FormControlLabel, FormControl, Tooltip, IconButton } from '@mui/material';
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { generateDates } from './date.js';
import { generateTimes } from './time.js';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import { styled } from '@mui/material/styles';
import './Homepage.css';
import theme from './HomeTheme.js';
import { ThemeProvider } from '@mui/material/styles';
import axios from 'axios'

import DeleteIcon from '@mui/icons-material/Delete';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function Homepage() {
  const dates = generateDates();
  const times = generateTimes();

	// Definisci lo stato per le prenotazioni
  const [prenotazioni, setPrenotazioni] = useState([]);

  // Effettua una query al database per recuperare le prenotazioni
  useEffect(() => {
    axios.get("http://localhost:8081/prenotazioni/info")
      .then(res => {
        setPrenotazioni(res.data);
      })
      .catch(err => console.log(err));
  }, []);
		

  const [showNewBox, setShowNewBox] = React.useState(false);
  const [selectedDateTime, setSelectedDateTime] = React.useState(null);
  const [selectedTimeButton, setSelectedTimeButton] = React.useState(null);
  const [selectedDataButton, setSelectedDataButton] = React.useState(null);
	
  const [reservetionConfirmed, setReservationConfirmed] = React.useState(null);
  const [clientLastReservations, setClientLastReservations] = useState({});

	// Imposta le ultime prenotazioni del cliente nello stato
	useEffect(() => {
		axios.get("http://localhost:8081/prenotazioni/info")
			.then(res => {
				const lastReservationsData = res.data.reduce((acc, curr) => {
					acc[curr.Email] = { Giorno: curr.Giorno, Ora: curr.Ora };
					return acc;
				}, {});
				setClientLastReservations(lastReservationsData);
			})
			.catch(err => console.log(err));
	}, []);

	const [emailP, setEmailP] = useState('')
	const [nomeP, setNomeP] = useState('')
  const [cognomeP, setCognomeP] = useState('')
  const [data, setData] = useState('')
  const [ora, setOra] = useState('')
  const [richiesta, setRichiesta] = useState('')

  const toggleNewBox = (date, time) => {
		setData(date)
    setOra(time)
    setShowNewBox(!showNewBox);
    setSelectedDateTime({ date, time });
		setSelectedTimeButton(time);
		setSelectedDataButton(date);
  };

	const confirmReservetion = () => {
		setReservationConfirmed(true);
	};

  const hideNewBox = () => {
    setShowNewBox(false);
  };

  const [showAccount, setShowAccount] = React.useState(false);

  const toggleAccount = () => {
    setShowAccount(!showAccount);
  };

  const hideAccount = () => {
    setShowAccount(false);
  };

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

	const handleDelete = (day, time) => {
		axios.delete("http://localhost:8081/delete", {
			data: {
				giorno: day,
				ora: time
			}
		})
		.then(res => {
			console.log("Prenotazione eliminata con successo:", res.data);
			window.location.reload();
		})
		.catch(err => console.error("Errore durante l'eliminazione della prenotazione:", err));
	};

	const handleSelectRichiesta = (email, nome, cognome, event) => {
    event.preventDefault();
    axios.post("http://localhost:8081/prenotazione", {emailP: email, nomeP: nome, cognomeP:cognome , data, ora, richiesta })
      .then(res => {
				confirmReservetion();
        hideNewBox();
      })
      .catch(err => console.log(err));
  }

	const location = useLocation();
  const clientData = location.state?.clientData; // Recupera i dati del client dalla location state

  const ButtonC = styled(Button)({
    width: '100px',
    backgroundColor: '#27b937',
    marginLeft: '73px',
    '&:hover': {
      backgroundColor: '#20952d',
      boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
    }
  });

  const ButtonA = styled(Button)({
    width: '100px',
    backgroundColor: '#ff0101',
    marginRight: '73px',
    '&:hover': {
      backgroundColor: '#b90303',
      boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="grid-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '40px' }}>
          <h1 className="App-header">
            MyBarber
          </h1>
          <Tooltip title="Account">
            <IconButton onClick={toggleAccount} sx={{ display: 'flex' }}>
              <AccountCircleIcon />
              <ContentCutIcon sx={{ display: 'flex', position: 'absolute', right: 10, opacity: 0 }} />
            </IconButton>
          </Tooltip>
          {showAccount && ( 
            <div className="account-client">


              <List
                sx={{ width: '100%', maxWidth: 360 }}
                component="nav"
              >
                <ListItemButton>
                  <ListItemIcon>
                    <AccountCircleIcon sx={{ color: '#36d3cf' }} />
                  </ListItemIcon>
                  <ListItemText primary={`${clientData.nome} ${clientData.cognome} `} /> 
                </ListItemButton>

                <ListItemButton>
                  <ListItemIcon>
                    <DraftsIcon sx={{ color: '#36d3cf' }} />
                  </ListItemIcon>
                  <ListItemText primary={clientData.email} />
                </ListItemButton>

                <ListItemButton onClick={handleClick}>
                  <ListItemIcon>
                    <InboxIcon sx={{ color: '#36d3cf' }} />
                  </ListItemIcon>
                  <ListItemText primary="Prenotazione" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <ContentCutIcon sx={{ color: '#36d3cf' }} />
                      </ListItemIcon>
                      <ListItemText primary={`${data} alle ${ora}`} />

											<ListItemButton onClick={() => handleDelete(data, ora)}>
                  			<ListItemIcon>
                    			<DeleteIcon sx={{ marginLeft:'20px', color: 'red' }} />
                  			</ListItemIcon>
                			</ListItemButton>
										</ListItemButton>
                  </List>
                </Collapse>
              </List>

            </div>
          )}
        </div>

        <div className="scroll-container">
          {dates.map((date, index) => (
            <div className="calendario" key={index}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div style={{ fontSize: '15px' }}>
                  {date}

                  {(date.includes('Dom') || date.includes('Lun')) ? (
                    <div style={{ color: 'red', marginTop: '20px' }}>
                      Chiuso
                    </div>
                  ) : (
                    <div style={{ marginTop: '5px' }}>
                      {times.map((time, timeIndex) => {
												const isTimeBooked = prenotazioni.some(prenotazione => prenotazione.Giorno === date && prenotazione.Ora === time);
												return (
                        <div key={timeIndex}>
                         
													{isTimeBooked ? (
															<Button onClick={() => toggleNewBox(date, time)} style={{ backgroundColor: 'red'}}>
																{time}
															</Button>
														) : (
															<Button onClick={() => toggleNewBox(date, time)} className={selectedTimeButton === time && selectedDataButton === date && reservetionConfirmed ? 'confirmed-time' : ''}>
																{time}
															</Button>
														)
													}

                          {showNewBox && (
                            <div className="riq-prenotazione">
                              <div>
                                {selectedDateTime && (
                                  <div style={{
                                    marginBottom: '10px',
                                    textAlign: 'center', color: '#fff'
                                  }}>
                                    {selectedDateTime.date},  {selectedDateTime.time}
                                  </div>
                                )}
                                <FormControl style={{ textAlign: 'center' }} onChange ={e=> setRichiesta(e.target.value)}>
                                  <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="taglio"
                                    name="radio-buttons-group"
                                  >
                                    <FormControlLabel name="" value="Taglio" control={<Radio />} label="Taglio" />
                                    <FormControlLabel name="" value="Taglio bambino" control={<Radio />} label="Taglio bambino" />
                                    <FormControlLabel name="" value="Shampoo" control={<Radio />} label="Shampoo" />
                                    <FormControlLabel name="" value="Barba" control={<Radio />} label="Barba" />
                                    <FormControlLabel name="" value="Rasata" control={<Radio />} label="Rasata" />
                                    <FormControlLabel name="" value="Taglio + Shampoo" control={<Radio />} label="Taglio + Shampoo" />
                                    <FormControlLabel name="" value="Taglio + Barba" control={<Radio />} label="Taglio + Barba" />
                                    <FormControlLabel name="" value="Rasata + Barba" control={<Radio />} label="Rasata + Barba" />
                                  </RadioGroup>
                                </FormControl>

                                <div className="buttonRow">
																  <ButtonC onClick={(event) => handleSelectRichiesta(clientData.email, clientData.nome, clientData.cognome, event)}>conferma</ButtonC>
                                  <ButtonA onClick={hideNewBox}>annulla</ButtonA>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
												);
                      })}
                    </div>
                  )}
                </div>
              </LocalizationProvider>
            </div>
          ))}
        </div>
      </div>
    </ThemeProvider >
  );
};