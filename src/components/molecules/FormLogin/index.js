import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import decode from 'jwt-decode';
import toast, { Toaster } from 'react-hot-toast';
import { Redirect, useHistory } from 'react-router-dom';
import {
	selectAuth,
	showPlaceholder,
	requestLogin,
	clearState,
	clearMessage,
} from '../../../features/auth/authSlice';
import { Alert } from '../../atoms';
import './form-login.scss';

const FormLogin = ({ title, ...rest }) => {
	const { register, handleSubmit, formState, reset, errors } = useForm();
	const {
		isSuccess,
		user,
		isFetching,
		isError,
		showAlert,
		errorMessage,
	} = useSelector(selectAuth);

	const history = useHistory();
	const mounted = useRef();

	const dispatch = useDispatch();

	const [passwordShown, setPasswordShown] = useState(false);

	useEffect(() => {
		return () => {
			if (isError && isFetching) {
				document.querySelector('.form-control').focus();
			}
			dispatch(clearState());
		};
	}, [dispatch, isError, isFetching]);

	useEffect(() => {
		if (errorMessage === 'Unauthorized!') {
			if (!mounted.current) {
				// mounting
				document.querySelector('.form-control').focus();
			} else {
				// updating
			}
		}

		if (isError && errorMessage === 'Unauthorized!') {
			reset();
			dispatch(clearState());
			toast.error(errorMessage);
		}

		if (isSuccess && showAlert) {
			reset();
			dispatch(clearState());
			dispatch(showPlaceholder(false));
			history.push('/dashboard');
		}
	}, [
		history,
		isError,
		errorMessage,
		isSuccess,
		user,
		showAlert,
		reset,
		dispatch,
	]);

	function later(delay) {
		return new Promise(function (resolve) {
			setTimeout(resolve, delay);
		});
	}

	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	const handleLogin = async (data, e) => {
		e.preventDefault();
		dispatch(clearMessage());
		await later(100);
		dispatch(requestLogin(data));
		await later(3000);
	};

	const token = localStorage.getItem('token');

	if (isSuccess || token) {
		try {
			const jwtDecode = decode(token);
			if (jwtDecode) {
				return <Redirect to="/dashboard" />;
			}
			if (jwtDecode.exp < new Date().getTime() / 1000) {
				localStorage.removeItem('token');
				return <Redirect to="/login" />;
			}
		} catch (error) {
			localStorage.removeItem('token');
			return <Redirect to="/login" />;
		}
	}

	return (
		<React.Fragment>
			<Toaster position="top-center" />
			{errorMessage === 'Unauthorized!' ? (
				<Alert
					color="danger"
					message="Oops!"
					detailMessage="Please enter your email or password right!"
				/>
			) : (
				''
			)}
			<form className="user" onSubmit={handleSubmit(handleLogin)}>
				<div className="form-group">
					<input
						autoFocus
						type="text"
						className={`form-control form-control-user ${
							errors.email ? 'is-invalid' : ''
						} rounded-0`}
						id="email"
						placeholder="Enter Email Address..."
						name="email"
						ref={register({
							required: 'This email is required!',
							pattern: /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
						})}
					/>
					{errors.email && errors.email.type === 'required' && (
						<small className="text-danger">
							&#9888; {errors.email.message}
						</small>
					)}
					{errors.email && errors.email.type === 'pattern' && (
						<small className="text-danger">&#9888; This email not valid!</small>
					)}
				</div>
				<div className="form-group">
					<input
						type={passwordShown ? 'text' : 'password'}
						className={`form-control form-control-user ${
							errors.password ? 'is-invalid' : ''
						} rounded-0 position-relative`}
						id="password"
						placeholder="Enter Password..."
						name="password"
						ref={register({
							required: 'This password is required!',
							minLength: 6,
						})}
					/>
					{!errors.password ? (
						<div
							className={errorMessage === 'Unauthorized!' ? 'wrapper-icon' : ''}
						>
							<i
								className={`icon-login fas fa-fw fa-eye${
									passwordShown ? '-slash' : ''
								}`}
								onClick={togglePasswordVisiblity}
							/>
						</div>
					) : (
						''
					)}
					{errors.password && errors.password.type === 'required' && (
						<small className="text-danger">
							&#9888; {errors.password.message}
						</small>
					)}
					{errors.password && errors.password.type === 'minLength' && (
						<small className="text-danger">
							&#9888; The password minimum 6 characters!
						</small>
					)}
				</div>
				<button
					type="submit"
					name="submit"
					disabled={formState.isSubmitting}
					className="btn btn-primary btn-user btn-block rounded-0"
				>
					{formState.isSubmitting ? (
						<div
							className="spinner-border spinner-border-sm"
							role="status"
						></div>
					) : (
						''
					)}
					{formState.isSubmitting ? ' Loading . . .' : title}
				</button>
			</form>
		</React.Fragment>
	);
};

export default FormLogin;
