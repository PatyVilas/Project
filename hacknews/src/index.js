import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.render(
	<React.StrictMode>
		<AuthContextProvider>
			<Suspense fallback={<div>Loading page...</div>}>
				<Router>
					<App />
				</Router>
			</Suspense>
		</AuthContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
