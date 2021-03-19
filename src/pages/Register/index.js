import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/scss/auth/sb-admin-2.scss';

class Register extends Component {
	constructor(props) {
		super(props);
		this.handleRegister = this.handleRegister.bind(this);
	}
	handleRegister(e) {
		e.preventDefault();
		this.props.history.push('/login');
	}
	render() {
		const { location } = this.props;
		if (location.pathname === '/register')
			document.body.classList.add('bg-dark');
		return (
			<React.Fragment>
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-xl-9 col-lg-12 col-md-9">
							<div className="card o-hidden border-0 shadow-lg my-5">
								<div className="card-body p-0">
									{/* Nested Row within Card Body */}
									<div className="row justify-content-center">
										<div className="col-lg-10">
											<div className="p-5">
												<div className="text-center">
													<h1 className="h4 text-gray-900 mb-4">
														Create an Account!
													</h1>
												</div>
												<form className="user" onClick={this.handleRegister}>
													<div className="form-group row">
														<div className="col-sm-6 mb-3 mb-sm-0">
															<input
																autoFocus
																type="text"
																className="form-control form-control-user rounded-0"
																id="exampleFirstName"
																placeholder="First Name"
															/>
														</div>
														<div className="col-sm-6">
															<input
																type="text"
																className="form-control form-control-user rounded-0"
																id="exampleLastName"
																placeholder="Last Name"
															/>
														</div>
													</div>
													<div className="form-group">
														<input
															type="email"
															className="form-control form-control-user rounded-0"
															id="exampleInputEmail"
															name="email"
															placeholder="Email Address"
														/>
													</div>
													<div className="form-group row">
														<div className="col-sm-6 mb-3 mb-sm-0">
															<input
																type="password"
																className="form-control form-control-user rounded-0"
																id="exampleInputPassword"
																placeholder="Password"
															/>
														</div>
														<div className="col-sm-6">
															<input
																type="password"
																className="form-control form-control-user rounded-0"
																id="exampleRepeatPassword"
																placeholder="Repeat Password"
															/>
														</div>
													</div>
													<button
														type="submit"
														name="submit"
														className="btn btn-primary btn-user btn-block rounded-0"
													>
														Register Account
													</button>
												</form>
												<hr />
												<div className="text-center">
													<Link className="small" to="/forgot-password">
														Forgot Password?
													</Link>
												</div>
												<div className="text-center">
													<Link className="small" to="/login">
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

export default Register;
