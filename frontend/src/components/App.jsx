import {
	BrowserRouter as Router,
	Switch,
	Route
  } from "react-router-dom";
import axios from 'axios';
import './App.css';
import Header from './Header';
import Home from './Home';
import Products from './Products';

const axiosCancelToken = axios.CancelToken;
const source = axiosCancelToken.source();

function handleCancelRequest() {
	source.cancel('Canceled axios request');
}

window.addEventListener("beforeunload", () => {
	source.cancel('Canceled axios request');
});

function App() {
  return (
    <div className="App">
		<Header onCancel={handleCancelRequest} />
		<Router>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/gloves">
					<Products product="gloves" source={source} />
				</Route>
				<Route exact path="/facemasks">
					<Products product="facemasks" source={source} />
				</Route>
				<Route exact path="/beanies">
					<Products product="beanies" source={source} />
				</Route>
			</Switch>
		</Router>
    </div>
  );
}

export default App;
