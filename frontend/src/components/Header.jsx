import React from 'react';
import {
	BrowserRouter as Router,
	useRouteMatch
  } from "react-router-dom";
import './Header.css';

function Header(props) {
	return (<>
		<nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light py-3">
			<NavBrandLink onCancel={props.onCancel} name="West Side Street Clothing" to="/" />
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse navbar-center navbar-text" id="navbarNavAltMarkup">
				<Router>
					<div className="navbar-nav">
						<NavLink onCancel={props.onCancel} name="Gloves" to="/gloves" />
						<NavLink onCancel={props.onCancel} name="Facemasks" to="/facemasks" />
						<NavLink onCancel={props.onCancel} name="Beanies" to="/beanies" />
					</div>
				</Router>
			</div>
		</nav>
	</>);
}

function NavBrandLink(props) {
	function newCancelReq() {
		if (props.onCancel) {
			props.onCancel();
		}
	}
	return (<>
		<a onClick={newCancelReq} className="navbar-brand navbar-brand-text" href={props.to}>{props.name}</a>
	</>);
}

function NavLink(props) {
	let match = useRouteMatch({
		path: props.to,
	});
	function newCancelReq() {
		if (props.onCancel) {
			props.onCancel();
		}
	}
	return (<>
		<a onClick={newCancelReq} className={match ? "nav-link active" : "nav-link"} href={props.to}>{props.name}</a>
	</>);
}

export default Header;