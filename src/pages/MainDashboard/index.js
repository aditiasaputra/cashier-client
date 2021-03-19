import React, { useEffect } from 'react';
import decode from 'jwt-decode';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import ReactPlaceholder from 'react-placeholder';
import toast, { Toaster } from 'react-hot-toast';
import 'react-placeholder/lib/reactPlaceholder.css';
import {
	AuthHeader,
	AuthSidebar,
	AuthFooter,
} from '../../components/molecules/auth';
import '../../assets/vendor/fontawesome-free/css/all.min.css';
import '../../assets/scss/auth/sb-admin-2.scss';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {
	clearState,
	showPlaceholder,
	fetchUserByToken,
	clearAlert,
	selectAuth,
} from '../../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import Dashboard from '../Dashboard';

const MainDashboard = (props) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { isError, showAlert, placeholder } = useSelector(selectAuth);
	const token = localStorage.getItem('token');

	useEffect(() => {
		if (!isError) {
			dispatch(fetchUserByToken(token));
		}
	}, [dispatch, isError, token]);

	useEffect(() => {
		// Jika hasil tokennya itu diedit/tidak valid
		if (isError) {
			toast.error('Token invalid!', { duration: 3000 });
			dispatch(showPlaceholder(false));
			if (!placeholder) {
				dispatch(clearState());
				localStorage.removeItem('token');
				return history.push('/login');
			}
		}
		if (showAlert) {
			toast.success('Welcome back!', { duration: 3000 });
			dispatch(clearAlert());
		}
	}, [dispatch, isError, token, showAlert, placeholder, history]);

	try {
		const { exp } = decode(token);
		if (exp < new Date().getTime() / 1000) {
			if (placeholder) {
				localStorage.removeItem('token');
				return history.push('/login');
			}
		}
	} catch (error) {
		// Jika token dari luar (bukan hasil generate, tapi token dari orang iseng)
		dispatch(showPlaceholder(false));
		// if (isError && !placeholder) {
		// 	localStorage.removeItem('token');
		// 	return <Redirect to="/login" />;
		// }
		if (!token && error) {
			localStorage.removeItem('token');
			dispatch(clearState());
			return <Redirect to="/login" />;
		}
	}

	return (
		<React.Fragment>
			<Toaster position="top-center" />
			<div id="wrapper">
				<AuthSidebar location={props.location.pathname} />
				<div id="content-wrapper" className="d-flex flex-column">
					<AuthHeader />
					<Switch>
						<Route path="/">
							{/* Main Content */}
							<div id="content">
								{/* Begin Page Content */}
								<div className="container-fluid">
									<ReactPlaceholder
										type="text"
										delay={3000}
										ready={placeholder}
										rows={3}
										color="#E0E0E0"
									>
										<Dashboard />
									</ReactPlaceholder>
								</div>
								{/* End of Page Content */}
							</div>
							{/* End of Content */}
						</Route>
					</Switch>
					<AuthFooter />
				</div>
			</div>
		</React.Fragment>
	);
};

export default MainDashboard;
