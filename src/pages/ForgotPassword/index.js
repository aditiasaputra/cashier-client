import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.handleForgot = this.handleForgot.bind(this);
	}
	handleForgot(e) {
		e.preventDefault();
		this.props.history.push('/login');
	}
	render() {
		const { location } = this.props;
		if (location.pathname === '/forgot-password')
			document.body.classList.add('bg-dark');
		return (
			<React.Fragment>
				<div className="container">
					{/* Outer Row */}
					<div className="row justify-content-center">
						<div className="col-xl-10 col-lg-12 col-md-9">
							<div className="card o-hidden border-0 shadow-lg my-5">
								<div className="card-body p-0">
									{/* Nested Row within Card Body */}
									<div className="row justify-content-center">
										<div className="col-lg-9">
											<div className="p-5">
												<div className="text-center">
													<h1 className="h4 text-gray-900 mb-2">
														Forgot Your Password?
													</h1>
													<p className="mb-4">
														We get it, stuff happens. Just enter your email
														address below and we'll send you a link to reset
														your password!
													</p>
												</div>
												<form className="user" onClick={this.handleForgot}>
													<div className="form-group">
														<input
															autoFocus
															type="email"
															className="form-control form-control-user rounded-0"
															id="exampleInputEmail"
															name="email"
															aria-describedby="emailHelp"
															placeholder="Enter Email Address..."
														/>
													</div>
													<button
														type="submit"
														name="submit"
														className="btn btn-primary btn-user btn-block rounded-0"
													>
														Reset Password
													</button>
												</form>
												<hr />
												<div className="text-center">
													<Link className="small" to="register">
														Create an Account!
													</Link>
												</div>
												<div className="text-center">
													<Link className="small" to="login">
														Already have an account? Login!
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

export default ForgotPassword;
