import React, { useState, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Topbar from './components/Topbar';
import Header from './components/Header';
import Content from './components/Content';
import CustomThemePalette from './components/CustomThemePalette';


export const drawerWidth = 200;
export const ThemeModeContext = React.createContext({});
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

	const setThemeMode = {setMode, setThemeValue};

	const theme = useMemo(() => createTheme(getDesignTokens(mode, themeValue)), [mode, themeValue]);

	return (
		<ThemeModeContext.Provider value = {{ mode, themeValue, setThemeMode }}>
			<ThemeProvider theme = {theme}>
				<CssBaseline />
				<Box sx = {{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
					<Topbar />
					<Header />
					<Content />
				</Box>
		  </ThemeProvider>
	  </ThemeModeContext.Provider>
	);
};

export default App;