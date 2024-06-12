import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiButton: {
        styleOverrides: {
          root: {
            color: '#fff',
            marginTop:'10px',
            backgroundColor: '#36d3cf',
            boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
            '&:hover': {
              backgroundColor: '#20b1ad',
              boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
            },
            
          }
        }
      },
			
    MuiFormLabel: { 
      styleOverrides: {
        root: {
          color: '#36d3cf !important', 
        },
      },
    },

    MuiFilledInput: { 
        styleOverrides: {
          root: {
            background: '#4c4c4c', 
            color: 'white', 
            borderRadius: '4px',
            '&:before': { 
                borderBottomLeftRadius:'4px',
                borderBottomRightRadius:'4px',
              },
            '&::after': { 
                borderBottom: '2px solid #36d3cf',
                borderBottomLeftRadius:'4px',
                borderBottomRightRadius:'4px',
              }
          }
        }
    },

    MuiInputBase: { 
        styleOverrides: {
          root: {
            background: '#4c4c4c', 
            color: 'white',
            '&:hover': {
                borderColor: '#ccc',
                backgroundColor: '#1c1c1c !important',
                boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
              },
          }
        }
    },

    MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgb(0 0 0 / 0%)', 
              widgh: '24px',
              borderBottom: '1px solid #000',
              
            },
          },
        },
      },
  },
});

export default theme;