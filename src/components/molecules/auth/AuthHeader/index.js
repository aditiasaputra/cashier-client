import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../../features/auth/authSlice';
import ReactPlaceholder from 'react-placeholder';
import { Link } from 'react-router-dom';
import { LogoutAlert } from '../../.';

const AuthHeader = (props) => {
	const { user, placeholder } = useSelector(selectAuth);
	const mounted = useRef();

	useEffect(() => {
		if (!mounted.current) {
			// mounting
		} else {
			// updating
		}
	}, []);

	return (
		<React.Fragment>
			{/* Topbar */}
			<nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
				{/* Sidebar Toggle (Topbar) */}
				<button
					id="sidebarToggleTop"
					className="btn btn-link d-md-none rounded-circle mr-3"
				>
					<i className="fa fa-bars" />
				</button>
				{/* Topbar Navbar */}
				<ul className="navbar-nav ml-auto">
					<div className="topbar-divider d-none d-sm-block" />
					{/* Nav Item - User Information */}
					<li className="nav-item dropdown no-arrow">
						<Link
							className="nav-link dropdown-toggle"
							to="#"
							id="userDropdown"
							role="button"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
						>
							<ReactPlaceholder
								type="text"
								delay={3000}
								ready={placeholder}
								rows={3}
								color="#E0E0E0"
							>
								<span className="mr-2 d-none d-lg-inline text-gray-600 small">
									{user ? user.name : ''}
								</span>
							</ReactPlaceholder>
							<ReactPlaceholder
								type="media"
								delay={3000}
								ready={placeholder}
								rows={3}
								color="#E0E0E0"
							>
								<img
									className="img-profile rounded-circle"
									src="https://source.unsplash.com/QAB-WJcbgJk/60x60"
									alt=""
								/>
							</ReactPlaceholder>
						</Link>
						{/* Dropdown - User Information */}
						<div
							className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
							aria-labelledby="userDropdown"
						>
							<Link className="dropdown-item" to="#">
								<i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
								Profile
							</Link>
							<Link className="dropdown-item" to="#">
								<i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
								Settings
							</Link>
							<div className="dropdown-divider" />
							{/* Button trigger modal */}
							{/* //? BUAT ACTION UNTUK MENGUBAH STATE GLOBAL UNTUK BAGIAN LOGOUT. LOGIC: clearstate MENJADI false / kosong //? */}
							<LogoutAlert
								title="Logout"
								classLink="dropdown-item"
								classIcon="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"
							/>
						</div>
					</li>
				</ul>
			</nav>
			{/* End of Topbar */}
		</React.Fragment>
	);
};

export default AuthHeader;
