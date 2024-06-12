import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          height: '32px',
          color: '#fff',
          marginTop: '5px',
          backgroundColor: '#36d3cf',
          borderRadius: '12px',
          boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
          '&:hover': {
            backgroundColor: '#25b1ad',
            boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
          },

        }
      }
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          '&': {
            '& svg': {
              color: '#36d3cf',
              transition: '0.2s',
              transform: 'translateX(0) rotate(0)',
              width: '60px',
              height: '50px',
              marginBottom: '-28px',
            },
            '&:hover, &:focus': {
              bgcolor: 'unset',
              '& svg:first-of-type': {
                transform: 'translateX(-5px) rotate(-10deg)',
              },
              '& svg:last-of-type': {
                right: 0,
                opacity: 0.8,
                width: '20px',
                color: 'white',
                transform: 'rotate(215deg)',
                marginRight:'10px',
              },
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              position: 'revert',
              height: '10%',
              display: 'block',
              left: 0,
              width: '1px',
              bgcolor: 'divider',
            },
          },
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: '2px',
          backgroundColor: '#36d3cf',
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
    
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#36d3cf !important',
        },
      },
    },

    MuiToggleButtonGroup: {
      styleOverrides: {
        firstButton: {
          borderRadius: '12px',
          marginRight: '15px',
          borderRight:'none',
        },
        lastButton:{
          borderRadius: '12px',
          marginLeft:'15px',
          borderLeft:'none',
        },
      },
    },
    
    MuiToggleButton: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          height: '32px',
          width: '150px',
          color: '#fff',
          marginTop: '5px',
          marginLeft: '10px',
          marginRight: '10px',
          backgroundColor: '#36d3cf',
          borderRadius: '12px',
          boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
          '&:hover': {
            backgroundColor: '#25b1ad',
            boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
          },
          '&.Mui-selected': {
            border: '2px solid #fff',
            color: '#fff',
            backgroundColor: '#36d3cf',

            '&:hover': {
              backgroundColor: '#25b1ad',
              boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
            },
          }
        },
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
            borderBottomLeftRadius: '4px',
            borderBottomRightRadius: '4px',
          },
          '&::after': { 
            borderBottom: '2px solid #36d3cf',
            borderBottomLeftRadius: '4px',
            borderBottomRightRadius: '4px',
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
            backgroundColor: '#1c1c1c',
            boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
          },
        }
      }
    },

    MuiStack: {
      styleOverrides: {
        root: {
          paddingRight: '20px',
          marginTop: '10px',
        },
      },
    },

    MuiAvatar: { 
      styleOverrides: {
        root: {
          background: '#36d3cf', 
        },
      },
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