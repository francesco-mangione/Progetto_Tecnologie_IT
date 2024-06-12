// barberpage.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Tooltip, IconButton } from '@mui/material';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import './barberpage.css'
import theme from './barbertheme.js';
import { ThemeProvider } from '@mui/material/styles';
import DraftsIcon from '@mui/icons-material/Drafts';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const columns = [
  {
    id: 'servizio',
    label: 'Servizio',
    minWidth: 170,
  },
  { id: 'nome', label: 'Nome', minWidth: 170 },
  { id: 'cognome', label: 'Cognome', minWidth: 170 },
  {
    id: 'data',
    label: 'Data',
    minWidth: 170,
  },
  {
    id: 'ora',
    label: 'Ora',
    minWidth: 170,
  },
];

function createData(nome, cognome, data, ora, servizio) {
  return { nome, cognome, data, ora, servizio };
}

const rows = [
  createData('Paolo', 'Rossi', '12-04-2002', '15:00', 'Taglio'),
  createData('Paolo', 'Rossi', '12-04-2002', '15:00', 'Taglio'),
  createData('Paolo', 'Rossi', '12-04-2002', '15:00', 'Taglio'),
  createData('Paolo', 'Rossi', '12-04-2002', '15:00', 'Taglio'),
  createData('Paolo', 'Rossi', '12-04-2002', '15:00', 'Taglio'),
  createData('Paolo', 'Rossi', '12-04-2002', '15:00', 'Taglio'),
  createData('Paolo', 'Rossi', '12-04-2002', '15:00', 'Taglio'),
  createData('Paolo', 'Rossi', '12-04-2002', '15:00', 'Taglio'),
  createData('Paolo', 'Rossi', '12-04-2002', '15:00', 'Taglio'),
  createData('Paolo', 'Rossi', '12-04-2002', '15:00', 'Taglio'),
  createData('Paolo', 'Rossi', '12-04-2002', '15:00', 'Taglio'),
  createData(),
  createData(),
  createData(),
  createData(),
];
export default function Barbermain() {
	const location = useLocation();
  const barberData = location.state?.barberData; // Recupera i dati del barbiere dalla location state

	

  const [showAccount, setShowAccount] = React.useState(false);

  const toggleAccount = () => {
    setShowAccount(!showAccount);
  };



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
          {showAccount && ( // Renderizza il nuovo riquadro solo se showNewBox è true
            <div className="account">


              <List
                sx={{ width: '100%', maxWidth: 360 }}
                component="nav"
              >
                <ListItemButton>
                  <ListItemIcon>
                    <AccountCircleIcon sx={{ color: '#36d3cf' }} />
                  </ListItemIcon>
                  <ListItemText primary={`${barberData.nome} ${barberData.cognome}`} /> {/* Visualizza Nome e Cognome del barbiere */}
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <DraftsIcon sx={{ color: '#36d3cf' }} />
                  </ListItemIcon>
                  <ListItemText primary={barberData.email} /> {/* Visualizza l'Email del barbiere */}
                </ListItemButton>
              </List>

            </div>
          )}
        </div>

        <div className="scroll-container">
          <Paper sx={{ marginLeft:'150px', width: '80%', height:'82%', borderRadius:'10px', backgroundColor:'#949494'}}>
            <TableContainer sx={{ maxHeight: 480, borderRadius:'9px', overflowY: 'auto', '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-track': { backgroundColor: 'trasparent' }, '&::-webkit-scrollbar-thumb': { scrollPaddingTop: '10px', backgroundColor: '#888', borderRadius:'6px', height: '60%',}  }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        sx={{ backgroundColor:'#1f1f1f', color:'#fff' }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>

          </Paper>
        </div>
      </div>
    </ThemeProvider >
  );
};