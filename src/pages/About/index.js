import React, { Component } from 'react';

class About extends Component {
	render() {
		const { location } = this.props;
		if (location.pathname === '/about')
			document.body.classList.remove('bg-dark');
		return (
			<React.Fragment>
				<div className="container">
					<div>Hello from About</div>
				</div>
			</React.Fragment>
		);
	}
}

export default About;
