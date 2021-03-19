import React from 'react';

const Input = ({ name, type, id, placeholder, size, ...rest }) => {
	return (
		<React.Fragment>
			<input
				type={type}
				name={name}
				id={id}
				placeholder={placeholder}
				className={`"form-control ${size ? `form-control-${size}` : ''}"`}
				{...rest}
			/>
		</React.Fragment>
	);
};

export default Input;
