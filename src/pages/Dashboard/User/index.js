import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
	Container,
	Row,
	Col,
	Modal,
	Button,
	Spinner,
	Form,
	Image,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FILE_SIZE, SUPPORTED_FORMATS } from '../../../constants';
import { LoaderData } from '../../../components/atoms';
import { UserService } from '../../../service';
import TableUser from '../../../components/molecules/TableUser';
import './user.scss';
import Indonesia from './Indonesia.json';

const province = Indonesia;

// Schema for validation
const schema = yup.object().shape({
	name: yup
		.string()
		.required('The name is required!')
		.min(2, 'The name minimum 2 characters!'),
	email: yup
		.string()
		.email('The email must valid!')
		.required('The email is required!')
		.min(2, 'The email minimum 2 characters!'),
	gender: yup.string().required('The gender is required!'),
	role: yup.string().required('The role is required!'),
	place_of_birth: yup.string().notRequired(),
	date_of_birth: yup.string().notRequired(),
	address: yup.string().notRequired(),
	photo: yup
		.mixed()
		.notRequired()
		.test('fileSize', 'The photo is required!', (value) => {
			return !value || value.length > 0;
		})
		.test('fileSize', 'The file is too large!', (value) => {
			return (
				!value || (value && value.length > 0 && value[0].size <= FILE_SIZE)
			);
		})
		.test('fileFormat', 'The file is not supported format!', (value) => {
			return (
				!value ||
				(value && value.length > 0 && SUPPORTED_FORMATS.includes(value[0].type))
			);
		}),
	password: yup
		.string()
		.required('The password is required!')
		.min(6, 'The password minimum 6 characters!'),
	password_confirmation: yup
		.string()
		.required('The confirmation password is required!')
		.oneOf([yup.ref('password'), null], 'The password must match!'),
});

function later(delay) {
	return new Promise(function (resolve) {
		setTimeout(resolve, delay);
	});
}

// DELETE USER MODAL
const DeleteUserModal = (props) => {
	const { register, handleSubmit, formState, reset } = useForm();

	const mounted = useRef(false);
	// const inputRef = useRef();

	useEffect(() => {
		if (!mounted.current) {
			// mounting
			// if (props.show) inputRef.current.focus();
		} else {
			// updating
		}
	});

	const deleteUser = async (data, e) => {
		e.preventDefault();

		const { id } = data;

		await later(3000);
		UserService.destroy(id)
			.then((response) => {
				if (response.status === 200) {
					props.setShow(false);
					reset();
					toast.success('User successfully deleted!', {
						duration: 3000,
					});
				}
			})
			.catch((error) => {
				if (error.response) {
					toast.error(error.response.statusText, { duration: 3000 });
				}
			});
	};

	return (
		<Modal
			animation={false}
			scrollable={false}
			show={props.show}
			onHide={() => {
				props.setUser([]);
				props.setShow(false);
			}}
			aria-labelledby="example-modal-sizes-title-lg"
		>
			<Form onSubmit={handleSubmit(deleteUser)}>
				<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-lg">
						Delete User
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Are you sure delete{' '}
					<span className="font-weight-bold">"{props.user.name}"</span> ?
					<Form.Control
						type="hidden"
						name="id"
						defaultValue={props.user.id}
						ref={register}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => {
							props.setUser([]);
							props.setShow(false);
						}}
					>
						Cancel
					</Button>
					<Button
						variant="danger"
						type="submit"
						name="submit"
						disabled={formState.isSubmitting}
					>
						{formState.isSubmitting ? (
							<Spinner
								as="span"
								animation="border"
								size="sm"
								role="status"
								aria-hidden="true"
							/>
						) : (
							''
						)}
						{formState.isSubmitting ? ' Loading . . .' : 'Delete'}
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

// EDIT USER MODAL
const EditUserModal = (props) => {
	const { register, handleSubmit, formState, reset, errors } = useForm({
		resolver: yupResolver(schema),
	});

	const [fileName, setFileName] = useState('Choose Photo');
	const [passwordShown, setPasswordShown] = useState(false);
	const [tempoImg, setTempoImg] = useState();

	const showTempoImg = (img) => {
		let reader = new FileReader();

		reader.readAsDataURL(img);
		reader.onloadend = () => {
			setTempoImg(reader.result);
		};
	};

	const mounted = useRef(false);
	// const inputRef = useRef();

	useEffect(() => {
		if (!mounted.current) {
			// mounting
			// if (props.show) inputRef.current.focus();
		} else {
			// updating
		}
	});

	const updateUser = async (data, e) => {
		e.preventDefault();

		data.photo = data.photo[0];

		const formData = new FormData();
		for (const [key, value] of Object.entries(data)) {
			formData.append(key, value);
		}
		formData.append('_method', 'PUT');

		await later(3000);
		UserService.update(formData, data.id)
			.then((response) => {
				if (response.status === 200) {
					setFileName('Choose Photo');
					props.setShow(false);
					setTempoImg();
					reset();
					toast.success('User successfully update!', {
						duration: 3000,
					});
				}
			})
			.catch((error) => {
				if (error.response) {
					toast.error(error.response.statusText, { duration: 3000 });
				}
			});
	};

	return (
		<Modal
			animation={false}
			dialogClassName="modal-90w"
			scrollable={false}
			show={props.show}
			onHide={() => {
				props.setUser([]);
				props.setShow(false);
			}}
			aria-labelledby="example-modal-sizes-title-lg"
		>
			<Form onSubmit={handleSubmit(updateUser)}>
				<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-lg">
						Form Edit User
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Control
						type="hidden"
						name="id"
						defaultValue={props.user.id}
						ref={register}
					/>
					<Container fluid>
						<Row>
							<Col>
								<Form.Group controlId="name">
									<Form.Label>Edit Name</Form.Label>
									<Form.Control
										autoFocus
										type="text"
										name="name"
										isInvalid={errors.name ? true : false}
										defaultValue={props.user.name}
										placeholder="Enter Name"
										ref={register}
									/>
									{errors.name && (
										<Form.Control.Feedback type="invalid">
											&#9888; {errors.name.message}
										</Form.Control.Feedback>
									)}
								</Form.Group>
							</Col>
							<Col>
								<Form.Group controlId="gender">
									<Form.Label>Edit Gender</Form.Label>
									<Form.Control
										as="select"
										name="gender"
										defaultValue={props.user.gender}
										isInvalid={errors.gender ? true : false}
										ref={register}
									>
										<option value={''}>Select Gender</option>
										<option value={'male'}>Male</option>
										<option value={'female'}>Female</option>
									</Form.Control>

									{errors.gender && (
										<Form.Text className="text-danger">
											&#9888; {errors.gender.message}
										</Form.Text>
									)}
								</Form.Group>
							</Col>
						</Row>
					</Container>

					<Container fluid>
						<Row>
							<Col>
								<Form.Group controlId="place_of_birth">
									<Form.Label>Edit Place of birth</Form.Label>
									<Form.Control
										as="select"
										name="place_of_birth"
										defaultValue={props.user.place_of_birth}
										isInvalid={errors.place_of_birth ? true : false}
										ref={register}
									>
										<option value={''}>Select Place of Birth</option>
										{province.map((i, v) => {
											return (
												<option key={v} value={i}>
													{i}
												</option>
											);
										})}
										;
									</Form.Control>
									{errors.place_of_birth && (
										<Form.Control.Feedback type="invalid">
											&#9888; {errors.place_of_birth.message}
										</Form.Control.Feedback>
									)}
								</Form.Group>
							</Col>
							<Col>
								<Form.Group controlId="date_of_birth">
									<Form.Label>Edit Date of Birth</Form.Label>
									<Form.Control
										type="date"
										name="date_of_birth"
										defaultValue={props.user.date_of_birth}
										isInvalid={errors.date_of_birth ? true : false}
										placeholder="Select Date of Birth"
										ref={register}
									/>
									{errors.date_of_birth && (
										<Form.Control.Feedback type="invalid">
											&#9888; {errors.date_of_birth.message}
										</Form.Control.Feedback>
									)}
								</Form.Group>
							</Col>
						</Row>
					</Container>

					<Container fluid>
						<Row>
							<Col>
								<Form.Group controlId="address">
									<Form.Label>Edit Address</Form.Label>
									<Form.Control
										as="textarea"
										name="address"
										defaultValue={props.user.address}
										isInvalid={errors.address ? true : false}
										placeholder="Enter Address"
										ref={register}
										rows={5}
									/>
									{errors.address && (
										<Form.Control.Feedback type="invalid">
											&#9888; {errors.address.message}
										</Form.Control.Feedback>
									)}
								</Form.Group>
							</Col>
							<Col>
								<Form.Group controlId="email">
									<Form.Label>Edit Email</Form.Label>
									<Form.Control
										type="text"
										name="email"
										defaultValue={props.user.email}
										isInvalid={errors.email ? true : false}
										placeholder="Enter Email"
										ref={register}
									/>
									{errors.email && (
										<Form.Control.Feedback type="invalid">
											&#9888; {errors.email.message}
										</Form.Control.Feedback>
									)}
								</Form.Group>
								<Form.Group controlId="role">
									<Form.Label>Edit Role</Form.Label>
									<Form.Control
										as="select"
										name="role"
										defaultValue={props.user.role}
										isInvalid={errors.role ? true : false}
										ref={register}
									>
										<option value={''}>Select Role</option>
										<option value={'customer'}>Customer</option>
										<option value={'cashier'}>Cashier</option>
									</Form.Control>
									{errors.role && (
										<Form.Control.Feedback type="invalid">
											&#9888; {errors.role.message}
										</Form.Control.Feedback>
									)}
								</Form.Group>
							</Col>
						</Row>
					</Container>

					<Container fluid>
						<Row>
							<Col>
								<Form.Group controlId="password">
									<Form.Label>Edit Password</Form.Label>
									<Form.Control
										type={passwordShown ? 'text' : 'password'}
										name="password"
										isInvalid={errors.password ? true : false}
										placeholder="Enter Password"
										ref={register}
									/>

									{errors.password && (
										<Form.Control.Feedback type="invalid">
											&#9888; {errors.password.message}
										</Form.Control.Feedback>
									)}
								</Form.Group>
							</Col>
							<Col>
								<Form.Group controlId="password_confirmation">
									<Form.Label>Edit Password confirmation</Form.Label>
									<Form.Control
										type={passwordShown ? 'text' : 'password'}
										name="password_confirmation"
										isInvalid={errors.password_confirmation ? true : false}
										placeholder="Enter Password Confirmation"
										ref={register}
									/>
									{errors.password_confirmation && (
										<Form.Control.Feedback type="invalid">
											&#9888; {errors.password_confirmation.message}
										</Form.Control.Feedback>
									)}
									<Form.Group controlId="visible_password">
										<Form.Check
											type="checkbox"
											onClick={(e) => setPasswordShown(e.target.checked)}
											label={passwordShown ? 'Hide password' : 'Show password'}
										/>
									</Form.Group>
								</Form.Group>
							</Col>
						</Row>
					</Container>

					<Container fluid>
						<Row>
							<Col>
								<Form.Group controlId="photo">
									<Form.Label>Upload Photo</Form.Label>
									<Form.File custom>
										<Form.File.Input
											name="photo"
											isInvalid={errors.photo ? true : false}
											onChange={(e) => {
												typeof e.target.files[0] === 'undefined'
													? setFileName(fileName)
													: setFileName(e.target.files[0].name);
												showTempoImg(e.target.files[0]);
											}}
											ref={register}
										/>
										<Form.File.Label data-browse="Browse">
											{fileName}
										</Form.File.Label>
										{errors.photo && (
											<Form.Text className="text-danger">
												&#9888; {errors.photo.message}
											</Form.Text>
										)}
									</Form.File>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group controlId="image">
									<Form.Label>Image</Form.Label>
									<Image src={tempoImg} thumbnail className="w-25 d-block" />
								</Form.Group>
							</Col>
						</Row>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => {
							props.setUser([]);
							props.setShow(false);
							setPasswordShown(false);
							setFileName('');
							setTempoImg('');
						}}
					>
						Cancel
					</Button>
					<Button
						variant="warning"
						type="submit"
						name="submit"
						disabled={formState.isSubmitting}
					>
						{formState.isSubmitting ? (
							<Spinner
								as="span"
								animation="border"
								size="sm"
								role="status"
								aria-hidden="true"
							/>
						) : (
							''
						)}
						{formState.isSubmitting ? ' Loading . . .' : 'Update'}
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

const User = (props) => {
	const { register, handleSubmit, formState, reset, errors } = useForm({
		resolver: yupResolver(schema),
	});

	const mounted = useRef(false);

	const [lgShow, setModalShow] = useState(false);
	const [showEditUserModal, setEditUserModal] = useState(false);
	const [showDeleteUserModal, setDeleteUserModal] = useState(false);
	const [passwordShown, setPasswordShown] = useState(false);

	const [data, setData] = useState([]);
	const [user, setUser] = useState([]);

	const [loading, setLoading] = useState(true);

	const [fileName, setFileName] = useState('Choose Photo');
	const [tempoImg, setTempoImg] = useState();

	const submitUser = async (data, e) => {
		e.preventDefault();

		data.photo = data.photo[0];

		const formData = new FormData();
		for (const [key, value] of Object.entries(data)) {
			formData.append(key, value);
		}

		await later(3000);
		UserService.store(formData)
			.then((response) => {
				if (response.status === 200) {
					setFileName('Choose Photo');
					setPasswordShown(false);
					setModalShow(false);
					setTempoImg();
					reset();
					toast.success('User successfully created!', {
						duration: 3000,
					});
				}
			})
			.catch((error) => {
				if (error.response.status === 400) {
					// setModalShow(true);
					toast.error(error.response.statusText, { duration: 3000 });
				}
			});
	};

	useEffect(() => {
		if (!mounted.current) {
			// mounting
		} else {
			// updating
		}
	});

	const fetchData = useCallback(() => {
		UserService.getUsers()
			.then((response) => {
				setData(response.data.users);
				setLoading(false);
			})
			.catch((error) => {
				toast.error(error, { duration: 3000 });
			});
	}, []);

	useEffect(() => {
		if (!mounted.current) {
			// mounting
			fetchData();
		} else {
			// updating
			mounted.current = true;
		}
	}, [fetchData]);

	const showTempoImg = (img) => {
		let reader = new FileReader();

		reader.readAsDataURL(img);
		reader.onloadend = () => {
			setTempoImg(reader.result);
		};
	};

	return (
		<React.Fragment>
			<Toaster position="top-center" />
			<h1 className="h3 mb-0 text-gray-800 mb-3">User</h1>

			<div className="mb-2">
				<Button variant="primary" onClick={() => setModalShow(true)}>
					Add User
				</Button>

				<Modal
					animation={false}
					show={lgShow}
					onHide={() => setModalShow(false)}
					dialogClassName="modal-90w"
					scrollable={false}
				>
					<Form onSubmit={handleSubmit(submitUser)}>
						<Modal.Header closeButton>
							<Modal.Title id="example-modal-sizes-title-lg">
								Form Entri User
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Container fluid>
								<Row>
									<Col>
										<Form.Group controlId="name">
											<Form.Label>Name</Form.Label>
											<Form.Control
												autoFocus
												type="text"
												name="name"
												isInvalid={errors.name ? true : false}
												placeholder="Enter Name"
												ref={register}
											/>
											{errors.name && (
												<Form.Control.Feedback type="invalid">
													&#9888; {errors.name.message}
												</Form.Control.Feedback>
											)}
										</Form.Group>
									</Col>
									<Col>
										<Form.Group controlId="gender">
											<Form.Label>Gender</Form.Label>
											<Form.Control
												as="select"
												name="gender"
												isInvalid={errors.gender ? true : false}
												ref={register}
											>
												<option value={''}>Select Gender</option>
												<option value={'male'}>Male</option>
												<option value={'female'}>Female</option>
											</Form.Control>

											{errors.gender && (
												<Form.Text className="text-danger">
													&#9888; {errors.gender.message}
												</Form.Text>
											)}
										</Form.Group>
									</Col>
								</Row>
							</Container>

							<Container fluid>
								<Row>
									<Col>
										<Form.Group controlId="place_of_birth">
											<Form.Label>Place of birth</Form.Label>
											<Form.Control
												as="select"
												name="place_of_birth"
												isInvalid={errors.place_of_birth ? true : false}
												ref={register}
											>
												<option value={''}>Select Place of Birth</option>
												{province.map((i, v) => {
													return (
														<option key={v} value={i}>
															{i}
														</option>
													);
												})}
												;
											</Form.Control>
											{errors.place_of_birth && (
												<Form.Control.Feedback type="invalid">
													&#9888; {errors.place_of_birth.message}
												</Form.Control.Feedback>
											)}
										</Form.Group>
									</Col>
									<Col>
										<Form.Group controlId="date_of_birth">
											<Form.Label>Date of Birth</Form.Label>
											<Form.Control
												type="date"
												name="date_of_birth"
												defaultValue={new Date().toISOString().slice(0, 10)}
												isInvalid={errors.date_of_birth ? true : false}
												placeholder="Select Date of Birth"
												ref={register}
											/>
											{errors.date_of_birth && (
												<Form.Control.Feedback type="invalid">
													&#9888; {errors.date_of_birth.message}
												</Form.Control.Feedback>
											)}
										</Form.Group>
									</Col>
								</Row>
							</Container>

							<Container fluid>
								<Row>
									<Col>
										<Form.Group controlId="address">
											<Form.Label>Address</Form.Label>
											<Form.Control
												as="textarea"
												name="address"
												isInvalid={errors.address ? true : false}
												placeholder="Entter Address"
												ref={register}
												rows={5}
											/>
											{errors.address && (
												<Form.Control.Feedback type="invalid">
													&#9888; {errors.address.message}
												</Form.Control.Feedback>
											)}
										</Form.Group>
									</Col>
									<Col>
										<Form.Group controlId="email">
											<Form.Label>Email</Form.Label>
											<Form.Control
												type="text"
												name="email"
												isInvalid={errors.email ? true : false}
												placeholder="Enter Email"
												ref={register}
											/>
											{errors.email && (
												<Form.Control.Feedback type="invalid">
													&#9888; {errors.email.message}
												</Form.Control.Feedback>
											)}
										</Form.Group>
										<Form.Group controlId="role">
											<Form.Label>Role</Form.Label>
											<Form.Control
												as="select"
												name="role"
												isInvalid={errors.role ? true : false}
												ref={register}
											>
												<option value={''}>Select Role</option>
												<option value={'customer'}>Customer</option>
												<option value={'cashier'}>Cashier</option>
											</Form.Control>
											{errors.role && (
												<Form.Control.Feedback type="invalid">
													&#9888; {errors.role.message}
												</Form.Control.Feedback>
											)}
										</Form.Group>
									</Col>
								</Row>
							</Container>

							<Container fluid>
								<Row>
									<Col>
										<Form.Group controlId="password">
											<Form.Label>Password</Form.Label>
											<Form.Control
												type={passwordShown ? 'text' : 'password'}
												name="password"
												isInvalid={errors.password ? true : false}
												placeholder="Enter Password"
												ref={register}
											/>

											{errors.password && (
												<Form.Control.Feedback type="invalid">
													&#9888; {errors.password.message}
												</Form.Control.Feedback>
											)}
										</Form.Group>
									</Col>
									<Col>
										<Form.Group controlId="password_confirmation">
											<Form.Label>Password confirmation</Form.Label>
											<Form.Control
												type={passwordShown ? 'text' : 'password'}
												name="password_confirmation"
												isInvalid={errors.password_confirmation ? true : false}
												placeholder="Enter Password Confirmation"
												ref={register}
											/>
											{errors.password_confirmation && (
												<Form.Control.Feedback type="invalid">
													&#9888; {errors.password_confirmation.message}
												</Form.Control.Feedback>
											)}
											<Form.Group controlId="visible_password">
												<Form.Check
													type="checkbox"
													onClick={(e) => setPasswordShown(e.target.checked)}
													label={
														passwordShown ? 'Hide password' : 'Show password'
													}
												/>
											</Form.Group>
										</Form.Group>
									</Col>
								</Row>
							</Container>

							<Container fluid>
								<Row>
									<Col>
										<Form.Group controlId="photo">
											<Form.Label>Upload Photo</Form.Label>
											<Form.File custom>
												<Form.File.Input
													name="photo"
													isInvalid={errors.photo ? true : false}
													onChange={(e) => {
														typeof e.target.files[0] === 'undefined'
															? setFileName(fileName)
															: setFileName(e.target.files[0].name);
														showTempoImg(e.target.files[0]);
													}}
													ref={register}
												/>
												<Form.File.Label data-browse="Browse">
													{fileName}
												</Form.File.Label>
												{errors.photo && (
													<Form.Text className="text-danger">
														&#9888; {errors.photo.message}
													</Form.Text>
												)}
											</Form.File>
										</Form.Group>
									</Col>
									<Col>
										<Form.Group controlId="image">
											<Form.Label>Image</Form.Label>
											<Image
												src={tempoImg}
												thumbnail
												className="w-25 d-block"
											/>
										</Form.Group>
									</Col>
								</Row>
							</Container>
						</Modal.Body>
						<Modal.Footer>
							<Button
								variant="secondary"
								onClick={() => {
									setFileName('Choose Photo!');
									setPasswordShown(false);
									setModalShow(false);
									setTempoImg('');
								}}
							>
								Cancel
							</Button>
							<Button
								variant="primary"
								type="submit"
								name="submit"
								disabled={formState.isSubmitting}
							>
								{formState.isSubmitting ? (
									<Spinner
										as="span"
										animation="border"
										size="sm"
										role="status"
										aria-hidden="true"
									/>
								) : (
									''
								)}
								{formState.isSubmitting ? ' Loading . . .' : 'Submit'}
							</Button>
						</Modal.Footer>
					</Form>
				</Modal>
			</div>

			{/* List data user */}
			<div className="card shadow mb-4">
				<div className="card-header py-3">
					<h6 className="m-0 font-weight-bold text-dark">List of Users</h6>
				</div>
				<div className="card-body">
					{loading ? (
						<div className="text-center">
							<LoaderData />
						</div>
					) : (
						<TableUser
							data={data}
							setShow={setEditUserModal}
							setDeleteShow={setDeleteUserModal}
							setUser={setUser}
							editModal={
								<EditUserModal
									show={showEditUserModal}
									setShow={setEditUserModal}
									user={user}
									setUser={setUser}
								/>
							}
							deleteModal={
								<DeleteUserModal
									show={showDeleteUserModal}
									setShow={setDeleteUserModal}
									user={user}
									setUser={setUser}
								/>
							}
						/>
					)}
				</div>
			</div>
		</React.Fragment>
	);
};

export default User;
