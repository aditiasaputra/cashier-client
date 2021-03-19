import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
	MainDashboard,
	ForgotPassword,
	Login,
	Main,
	Register,
} from '../../pages';

function Routes() {
	return (
		<React.Fragment>
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route exact path="/forgot-password" component={ForgotPassword} />
				<Route path="/dashboard" component={MainDashboard} />
				<Route path="/">
					<Main />
				</Route>
			</Switch>
		</React.Fragment>
	);
}

export default Routes;
