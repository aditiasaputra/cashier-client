import React from 'react';

const AuthFooter = () => {
	return (
		<React.Fragment>
			<footer className="sticky-footer bg-white">
				<div className="container my-auto">
					<div className="copyright text-center my-auto font-weight-bold">
						<span>Copyright © Your Website {new Date().getFullYear()}</span>
					</div>
				</div>
			</footer>
		</React.Fragment>
	);
};

export default AuthFooter;
