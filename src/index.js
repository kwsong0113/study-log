import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';

import App from './App';

const domain = process.env.AUTH0_DOMAIN;
const clientId = process.env.AUTH0_CLIENT_ID;

ReactDOM.render(
	<React.StrictMode>
		<Auth0Provider>
			<App />
		</Auth0Provider>
	</React.StrictMode>,
	document.getElementById('root')
);