import React from 'react';
import {
	BrowserRouter as Router,
	useRouteMatch
  } from "react-router-dom";
import './Header.css';

function Header(props) {
	return (
	<>
		<nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light py-3">
			<NavBrand onCancel={props.onCancel} name="West Side Street Clothing" to="/" activeOnlyWhenExact={true} />
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse navbar-center navbar-text" id="navbarNavAltMarkup">
				<Router>
					<div className="navbar-nav">
						<NavLink onCancel={props.onCancel} name="Gloves" to="/gloves" activeOnlyWhenExact={true} />
						<NavLink onCancel={props.onCancel} name="Facemasks" to="/facemasks" activeOnlyWhenExact={true} />
						<NavLink onCancel={props.onCancel} name="Beanies" to="/beanies" activeOnlyWhenExact={true} />
					</div>
				</Router>
			</div>
		</nav>
	</>);
}

function NavBrand(props) {
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
		exact: props.activeOnlyWhenExact
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