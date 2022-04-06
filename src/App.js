import React, { useState, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Topbar from './components/Topbar';
import Header from './components/Header';
import Content from './components/Content';


export const drawerWidth = 200;
export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const getDesignTokens = (mode) => ({
	palette: {
		mode,
		...(mode === 'light'
			? {
				border: {
					main: '#e4e4e4'
				}
			}
			: {
				primary: {
					main: '#fff',
					contrastText: '#1976d2'
				},
				background: {
					default: '#0b192a',
				},
				border: {
					main: '#283545'
				}
			})
	},
	breakpoints: {
    keys: ["xs", "sm", "smd", "md", "lg", "xl"],
    values: { xs: 0, sm: 600, smd: 700, md: 900, lg: 1200, xl: 1536 }
  }
});

const App = () => {
	const [mode, setMode] = useState('light')

	const colorMode = useMemo(() => ({
		toggleColorMode: () => {
			setMode((prevMode) => prevMode === 'light' ? 'dark' : 'light');
		}
	}));

	const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

	return (
		<ColorModeContext.Provider value = {colorMode}>
			<ThemeProvider theme = {theme}>
				<CssBaseline />
				<Box sx = {{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
					<Topbar />
					<Header />
					<Content />
				</Box>
		  </ThemeProvider>
	  </ColorModeContext.Provider>
	);
};

export default App;