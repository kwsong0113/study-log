import React, { useState, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Topbar from './components/Topbar';
import Header from './components/Header';
import StudyLog from './components/StudyLog';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const getDesignTokens = (mode) => ({
	palette: {
		mode,
		...(mode === 'light'
			? {
			}
			: {
				primary: {
					main: '#FFF',
					contrastText: '#1976d2'
				},
				background: {
					default: '#0b192a',
				}
			})
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
				<Topbar />
				<Box>
					<Header />
					<StudyLog />
				</Box>
		  </ThemeProvider>
	  </ColorModeContext.Provider>
	);
};

export default App;