import React, { Component } from 'react';

class Home extends Component {
	render() {
		const { location } = this.props;
		if (location.pathname === '/home' || location.pathname === '/')
			document.body.classList.remove('bg-dark');
		return (
			<React.Fragment>
				<div className="container">
					<div>Hello from Home</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Home;
