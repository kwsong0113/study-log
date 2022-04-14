import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import Topbar from './components/Topbar';
import Header from './components/Header';
import CustomThemePalette from './components/CustomThemePalette';
import UserDataProvider from './components/UserDataProvider';

import HomePage from './pages/HomePage';
import CommunityPage from './pages/CommunityPage';
import StudyLogPage from './pages/StudyLogPage';
import TodosPage from './pages/TodosPage';
import ErrorPage from './pages/ErrorPage';
import PleaseSignInPage from './pages/PleaseSignInPage';


export const drawerWidth = 200;
export const ThemeModeContext = React.createContext({});

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

const LayoutWithNavbar = () => {
	return (
		<Box sx = {{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
			<Topbar home = {false} />
			<Header />
			<Box sx = {{ ml: [0, `${drawerWidth}px`], overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
				<Outlet />
			</Box>
		</Box>
	);
}

const App = () => {
	const [mode, setMode] = useState('light');
	const [themeValue, setThemeValue] = useState('blue');

	const setThemeMode = {setMode, setThemeValue};

	const theme = useMemo(() => createTheme(getDesignTokens(mode, themeValue)), [mode, themeValue]);

	return (
		<UserDataProvider>
			<ThemeModeContext.Provider value = {{ mode, themeValue, setThemeMode }}>
				<ThemeProvider theme = {theme}>
					<CssBaseline />
					<Router>
						<Routes>
							<Route path = "/*" element = {<LayoutWithNavbar />}>
								<Route path = "studylog/:id" element = {<StudyLogPage />} />
								<Route path = "todos/:id" element = {<TodosPage />} />
								<Route path = "community" element = {<CommunityPage />} />
								<Route path = "pleasesignin" element = {<PleaseSignInPage />} />
								{/*<Route path = "*" element = {<Navigate replace to = "/" />} />*/}
								<Route path = "*" element = {<ErrorPage />} />
							</Route>
							<Route path = "/" element = {<HomePage />} />
						</Routes>
					</Router>
			  </ThemeProvider>
		  </ThemeModeContext.Provider>
	  </UserDataProvider>
	);
};

export default App;