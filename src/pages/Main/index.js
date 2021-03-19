import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About } from '..';
import { Header, Footer } from '../../components/';
import '../../assets/scss/custom.scss';
// import './index.scss';

const Main = () => {
	return (
		<React.Fragment>
			<Header />
			<Switch>
				<Route path="/about" component={About} />
				<Route path="/home" component={Home} />
				<Route path="/" component={Home} />
			</Switch>
			<Footer />
		</React.Fragment>
	);
};

export default Main;
