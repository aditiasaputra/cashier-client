import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Header() {
	return (
		<React.Fragment>
			<nav className="navbar navbar-expand-lg text-white navbar-dark bg-dark">
				<div className="container">
					<Link className="navbar-brand" to="/">
						Brand
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarNavAltMarkup"
						aria-controls="navbarNavAltMarkup"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div className="navbar-nav ml-auto">
							<NavLink className="nav-link" to="/home">
								Home
							</NavLink>
							<NavLink className="nav-link" to="/about">
								About
							</NavLink>
							<Link className="nav-link" to="/login">
								Login
							</Link>
						</div>
					</div>
				</div>
			</nav>
		</React.Fragment>
	);
}

export default Header;
