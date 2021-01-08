import React from 'react';
import {
	BrowserRouter as Router,
	useRouteMatch
  } from "react-router-dom";
import './Header.css';

function Header({ onCancel }) {
	return (<>
		<nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light py-3">
			<a onClick={() => onCancel()} className="navbar-brand navbar-brand-text" href="/">West Side Street Clothing</a>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse navbar-center navbar-text" id="navbarNavAltMarkup">
				<Router>
					<div className="navbar-nav">
						<NavLink onCancel={onCancel} name="Gloves" to="/gloves" />
						<NavLink onCancel={onCancel} name="Facemasks" to="/facemasks" />
						<NavLink onCancel={onCancel} name="Beanies" to="/beanies" />
					</div>
				</Router>
			</div>
		</nav>
	</>);
}

function NavLink({ name, to, onCancel }) {
	let match = useRouteMatch({
		path: to,
	});
	return (<>
		<a onClick={() => onCancel()} className={match ? "nav-link active" : "nav-link"} href={to}>{name}</a>
	</>);
}

export default Header;