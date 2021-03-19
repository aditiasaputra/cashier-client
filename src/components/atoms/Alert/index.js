import React from 'react';

const index = ({ color, message, detailMessage, ...rest }) => {
	return (
		<React.Fragment>
			<div
				className={`alert alert-${color} alert-dismissible fade show role=alert`}
			>
				<strong>{message}</strong> {detailMessage}
				<button
					type="button"
					className="close"
					data-dismiss="alert"
					aria-label="Close"
				>
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
		</React.Fragment>
	);
};

export default index;
