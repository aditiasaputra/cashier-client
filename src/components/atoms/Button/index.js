import React from 'react';

const Button = ({ title, type, color, outline, size, block, ...rest }) => {
	return (
		<React.Fragment>
			<button
				type={type}
				className={`"btn btn-${outline ? 'outline' : ''}-${color} ${
					size ? `btn-${size}` : ''
				} ${block ? `btn-${block}` : ''}"`}
				{...rest}
			>
				{title}
			</button>
		</React.Fragment>
	);
};

export default Button;
