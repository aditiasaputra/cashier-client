import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/scss/auth/sb-admin-2.scss';
import { FormLogin } from '../../components';

class Login extends Component {
	render() {
		const { location } = this.props;
		if (location.pathname === '/login') document.body.classList.add('bg-dark');
		return (
			<React.Fragment>
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-xl-9 col-lg-10 col-md-10">
							<div className="card o-hidden border-0 shadow-lg my-5">
								<div className="card-body p-0">
									{/* Nested Row within Card Body */}
									<div className="row justify-content-center">
										<div className="col-lg-9">
											<div className="p-5">
												<div className="text-center">
													<h1 className="h4 text-gray-900 mb-4">Login!</h1>
												</div>
												<FormLogin title="Login" />
												<hr />
												<div className="text-center">
													<Link className="small" to="/forgot-password">
														Forgot Password?
													</Link>
												</div>
												<div className="text-center">
													<Link className="small" to="/register">
														Create an Account!
													</Link>
												</div>
												<hr />
												<div className="text-center">
													<Link
														className="small btn btn-sm btn-secondary rounded-0"
														to="/"
													>
														Back to Home
													</Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Login;
