import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import './loader.scss';

const Loader = () => {
	return (
		<React.Fragment>
			<div className="loader">
				<ScaleLoader
					loading={true}
					height="40px"
					width="5px"
					radius="1px"
					margin="2px"
					color="#5b5b5b"
				/>
			</div>
		</React.Fragment>
	);
};

export default Loader;
