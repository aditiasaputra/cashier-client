import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

const LoaderData = () => {
	return (
		<React.Fragment>
			<div className="text-center">
				<BeatLoader
					loading={true}
					height="40px"
					width="5px"
					radius="1px"
					margin="2px"
					color="#252728"
				/>
			</div>
		</React.Fragment>
	);
};

export default LoaderData;
