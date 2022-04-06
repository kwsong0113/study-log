import React, { useState, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Topbar from './components/Topbar';
import Header from './components/Header';
import Content from './components/Content';
import CustomThemePalette from './components/CustomThemePalette';


export const drawerWidth = 200;
export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
const themeValue = 'red';

const getDesignTokens = (mode, themeValue) => ({
	palette: {
		mode,
		...(CustomThemePalette[themeValue][mode])
	},
	breakpoints: {
    keys: ["xs", "sm", "smd", "md", "lg", "xl"],
    values: { xs: 0, sm: 600, smd: 700, md: 900, lg: 1200, xl: 1536 }
  }
});

const App = () => {
	const [mode, setMode] = useState('light');
	const [themeValue, setThemeValue] = useState('blue');

	const colorMode = useMemo(() => ({
		toggleColorMode: () => {
			setMode((prevMode) => prevMode === 'light' ? 'dark' : 'light');
		}
	}));

	const theme = useMemo(() => createTheme(getDesignTokens(mode, themeValue)), [mode, themeValue]);

	return (
		<ColorModeContext.Provider value = {colorMode}>
			<ThemeProvider theme = {theme}>
				<CssBaseline />
				<Box sx = {{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
					<Topbar themeValue = {themeValue} setThemeValue = {setThemeValue} />
					<Header />
					<Content />
				</Box>
		  </ThemeProvider>
	  </ColorModeContext.Provider>
	);
};

export default App;