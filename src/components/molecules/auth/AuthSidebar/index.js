import React, { useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { JqueryCustom } from '../../../../utils';
import { LogoutAlert } from '../../.';
import { useDispatch } from 'react-redux';
import { showPlaceholder } from '../../../../features/auth/authSlice';

const AuthSidebar = ({ location }) => {
	const dispatch = useDispatch();
	const mounted = useRef();

	useEffect(() => {
		JqueryCustom();
	});

	useEffect(() => {
		if (!mounted.current) {
			// mounting
		} else {
			// updating
			const currentLocation = location.split('/');
			if (currentLocation.length === 2) {
				// if current location is only dashboard
				dispatch(showPlaceholder(false));
				setTimeout(() => {
					dispatch(showPlaceholder(true));
				}, 3000);
			} else {
				dispatch(showPlaceholder(false));
				setTimeout(() => {
					dispatch(showPlaceholder(true));
				}, 3000);
				// else dashboard/...
			}
		}
	}, [dispatch, location]);

	return (
		<React.Fragment>
			{/* Sidebar */}
			<ul
				className="navbar-nav bg-gradient-dark sidebar sidebar-dark accordion"
				id="accordionSidebar"
			>
				{/* Sidebar - Brand */}
				<NavLink
					className="sidebar-brand d-flex align-items-center justify-content-center"
					to="/dashboard"
				>
					<div className="sidebar-brand-icon rotate-n-15">
						<i className="fas fa-fw fa-tachometer-alt" />
					</div>
					<div className="sidebar-brand-text mx-3">Cashier App</div>
				</NavLink>
				{/* Divider */}
				<hr className="sidebar-divider my-0" />
				{/* Nav Item - Dashboard */}
				<li className={`nav-item ${location === '/dashboard' ? 'active' : ''}`}>
					<NavLink className="nav-link" to="/dashboard">
						<i className="fas fa-fw fa-fw fa-home" />
						<span>Dashboard</span>
					</NavLink>
				</li>
				{/* Divider */}
				<hr className="sidebar-divider" />
				{/* Heading */}
				<div className="sidebar-heading">Apps</div>
				{/* Nav Item - User */}
				<li
					className={`nav-item ${
						location === '/dashboard/users' ? 'active' : ''
					}`}
				>
					<NavLink className="nav-link" to="/dashboard/users">
						<i className="fas fa-fw fa-users" />
						<span>Users</span>
					</NavLink>
				</li>
				{/* Nav Item - Product */}
				<li
					className={`nav-item ${
						location === '/dashboard/products' ? 'active' : ''
					}`}
				>
					<NavLink className="nav-link" to="/dashboard/products">
						<i className="fas fa-fw fa-box-open" />
						<span>Products</span>
					</NavLink>
				</li>
				{/* Nav Item - Category */}
				<li
					className={`nav-item ${
						location === '/dashboard/categories' ? 'active' : ''
					}`}
				>
					<NavLink className="nav-link" to="/dashboard/categories">
						<i className="fas fa-fw fa-list-alt" />
						<span>Categories</span>
					</NavLink>
				</li>
				{/* Nav Item - Gift */}
				<li
					className={`nav-item ${
						location === '/dashboard/gifts' ? 'active' : ''
					}`}
				>
					<NavLink className="nav-link" to="/dashboard/gifts">
						<i className="fas fa-fw fa-gifts" />
						<span>Gifts</span>
					</NavLink>
				</li>
				{/* Nav Item - Claim Gift */}
				<li
					className={`nav-item ${
						location === '/dashboard/claim-gift' ||
						location === '/dashboard/list-claim-gift'
							? 'active'
							: ''
					}`}
				>
					<NavLink
						className={`nav-link ${
							location === '/dashboard/claim-gift' ||
							location === '/dashboard/list-claim-gift'
								? ''
								: 'collapsed'
						}`}
						to="#"
						data-toggle="collapse"
						data-target="#collapseOne"
						aria-expanded="true"
						aria-controls="collapseOne"
					>
						<i className="fas fa-fw fa-exchange-alt" />
						<span>Claim Gift</span>
					</NavLink>
					<div
						id="collapseOne"
						className={`collapse ${
							location === '/dashboard/claim-gift' ||
							location === '/dashboard/list-claim-gift'
								? 'show'
								: ''
						}`}
						aria-labelledby="headingTwo"
						data-parent="#accordionSidebar"
					>
						<div className="bg-white py-2 collapse-inner rounded">
							<h6 className="collapse-header">Claim Gift Management:</h6>
							<Link
								className={`collapse-item ${
									location === '/dashboard/claim-gift' ? 'active' : ''
								}`}
								to="/dashboard/claim-gift"
							>
								Claim Gift
							</Link>
							<Link
								className={`collapse-item ${
									location === '/dashboard/list-claim-gift' ? 'active' : ''
								}`}
								to="/dashboard/list-claim-gift"
							>
								List Claim Gift
							</Link>
						</div>
					</div>
				</li>
				{/* Nav Item - Transaction Management */}
				<li
					className={`nav-item ${
						location === '/dashboard/add-transaction' ||
						location === '/dashboard/list-transaction'
							? 'active'
							: ''
					}`}
				>
					<NavLink
						className={`nav-link ${
							location === '/dashboard/add-transaction' ||
							location === '/dashboard/list-transaction'
								? ''
								: 'collapsed'
						}`}
						to="#"
						data-toggle="collapse"
						data-target="#collapseTwo"
						aria-expanded="true"
						aria-controls="collapseTwo"
					>
						<i className="fas fa-fw fa-money-bill-alt" />
						<span>Transactions</span>
					</NavLink>
					<div
						id="collapseTwo"
						className={`collapse ${
							location === '/dashboard/add-transaction' ||
							location === '/dashboard/list-transaction'
								? 'show'
								: ''
						}`}
						aria-labelledby="headingTwo"
						data-parent="#accordionSidebar"
					>
						<div className="bg-white py-2 collapse-inner rounded">
							<h6 className="collapse-header">Trasanction Management:</h6>
							<Link
								className={`collapse-item ${
									location === '/dashboard/add-transaction' ? 'active' : ''
								}`}
								to="/dashboard/add-transaction"
							>
								Add Transaction
							</Link>
							<Link
								className={`collapse-item ${
									location === '/dashboard/list-transaction' ? 'active' : ''
								}`}
								to="/dashboard/list-transaction"
							>
								List Transaction
							</Link>
						</div>
					</div>
				</li>
				{/* Divider */}
				<hr className="sidebar-divider" />
				{/* Heading */}
				<div className="sidebar-heading">Others</div>
				<li
					className={`nav-item ${
						location === '/dashboard/profile' ? 'active' : ''
					}`}
				>
					<Link className="nav-link" to="/dashboard/profile">
						<i className="fas fa-fw fa-user" />
						<span>Profile</span>
					</Link>
				</li>
				<li
					className={`nav-item ${
						location === '/dashboard/settings' ? 'active' : ''
					}`}
				>
					<Link className="nav-link" to="/dashboard/settings">
						<i className="fas fa-fw fa-cogs" />
						<span>Settings</span>
					</Link>
				</li>
				{/* Divider */}
				<hr className="sidebar-divider d-none d-md-block" />
				{/* Nav Item - Tables */}
				<li className={`nav-item ${location === '/logout' ? 'active' : ''}`}>
					<LogoutAlert
						title="Logout"
						classLink="nav-link"
						classIcon="fas fa-fw fa-sign-out-alt"
					/>
				</li>
				{/* Divider */}
				<hr className="sidebar-divider d-none d-md-block" />
				{/* Sidebar Toggler (Sidebar) */}
				<div className="text-center d-none d-md-inline">
					<button className="rounded-circle border-0" id="sidebarToggle" />
				</div>
			</ul>
			{/* End of Sidebar */}
		</React.Fragment>
	);
};

export default AuthSidebar;
