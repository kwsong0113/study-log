import React, { useState, useMemo, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
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
import MyPage from './pages/MyPage';


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
  },
	typography: {
		fontFamily: `"Roboto", "Hevetica", "Arial", "Nanum Gothic", sans-serif`
	}
});

const LayoutWithNavbar = () => {
	return (
		<Box sx = {{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
			<Topbar home = {false} />
			<Header />
			<Box sx = {{ ml: [0, `${drawerWidth}px`], overflow: 'auto', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
				<Outlet />
			</Box>
		</Box>
	);
}

const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps);
};

const App = () => {
	const [mode, setMode] = useState('light');
	const [themeValue, setThemeValue] = useState('blue');

	useEffect(() => {
		const localMode = localStorage.getItem('mode');
		if (localMode) { setMode(localMode); }
		const localTheme = localStorage.getItem('theme');
		if (localTheme) { setThemeValue(localTheme); }
	}, []);

	useDidMountEffect(() => {
		localStorage.setItem('mode', mode);
	}, [mode]);

	useDidMountEffect(() => {
		localStorage.setItem('theme', themeValue);
	}, [themeValue]);

	const setThemeMode = {setMode, setThemeValue};

	const theme = useMemo(() => createTheme(getDesignTokens(mode, themeValue)), [mode, themeValue]);

	return (
		<ThemeModeContext.Provider value = {{ mode, themeValue, setThemeMode }}>
			<ThemeProvider theme = {theme}>
				<CssBaseline />
				<UserDataProvider>
					<Router>
						<Routes>
							<Route path = "/*" element = {<LayoutWithNavbar />}>
								<Route path = "studylog/:username" element = {<StudyLogPage />} />
								<Route path = "todos/:username" element = {<TodosPage />} />
								<Route path = "community" element = {<CommunityPage />} />
								<Route path = "pleasesignin" element = {<PleaseSignInPage />} />
								<Route path = "*" element = {<ErrorPage />} />
							</Route>
							<Route path = "/" element = {<HomePage />} />
							<Route path = "my" element = {<MyPage />} />
						</Routes>
					</Router>
	  		</UserDataProvider>
			</ThemeProvider>
		</ThemeModeContext.Provider>
	);
};

export default App;