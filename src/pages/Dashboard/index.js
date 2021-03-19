import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Loader } from '../../components/atoms';
// import ReactPlaceholder from 'react-placeholder';

// import Home from './Home';
// import User from './User';
// import Product from './Product';
// import Category from './Category';
// import Gift from './Gift';
// import Profile from './Profile';
// import SettingPage from './SettingPage';

const Home = React.lazy(() => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(import('./Home')), 300);
	});
});

const User = React.lazy(() => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(import('./User')), 300);
	});
});

const Product = React.lazy(() => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(import('./Product')), 300);
	});
});

const Category = React.lazy(() => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(import('./Category')), 300);
	});
});

const Gift = React.lazy(() => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(import('./Gift')), 300);
	});
});

const Profile = React.lazy(() => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(import('./Profile')), 300);
	});
});

const FormClaimGift = React.lazy(() => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(import('./FormClaimGift')), 300);
	});
});

const ListClaimGift = React.lazy(() => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(import('./ListClaimGift')), 300);
	});
});

const FormTransaction = React.lazy(() => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(import('./FormTransaction')), 300);
	});
});

const ListTransaction = React.lazy(() => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(import('./ListTransaction')), 300);
	});
});

const SettingPage = React.lazy(() => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(import('./SettingPage')), 300);
	});
});

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
		};
	}

	render() {
		return (
			<React.Fragment>
				<React.Suspense fallback={<Loader />}>
					<Switch>
						<Route exact path="/dashboard" component={Home} />
						<Route path="/dashboard/users" component={User} />
						<Route path="/dashboard/products" component={Product} />
						<Route path="/dashboard/categories" component={Category} />
						<Route path="/dashboard/gifts" component={Gift} />
						<Route path="/dashboard/profile" component={Profile} />
						<Route path="/dashboard/claim-gift" component={FormClaimGift} />
						<Route
							path="/dashboard/list-claim-gift"
							component={ListClaimGift}
						/>
						<Route
							path="/dashboard/add-transaction"
							component={FormTransaction}
						/>
						<Route
							path="/dashboard/list-transaction"
							component={ListTransaction}
						/>
						<Route path="/dashboard/settings" component={SettingPage} />
					</Switch>
				</React.Suspense>
			</React.Fragment>
		);
	}
}

export default Dashboard;
