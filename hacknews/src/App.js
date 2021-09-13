import './App.css';
import { Switch, Route } from 'react-router-dom';
import routes from './routes/routes';
import { Header, Footer } from './components';

function App() {
	return (
		<div className='App'>
			<Header />
			<Switch>
				{routes.map((route) => (
					<Route
						key={route.path}
						path={route.path}
						exact={route.exact}>
						<route.Page />
					</Route>
				))}
			</Switch>
			<Footer />
		</div>
	);
}

export default App;
