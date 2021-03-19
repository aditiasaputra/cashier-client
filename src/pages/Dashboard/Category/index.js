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
import { CategoryService } from '../../../service';
import './category.scss';
import TableCategory from '../../../components/molecules/TableCategory';

// Schema for validation
const schema = yup.object().shape({
	name: yup
		.string()
		.required('The name is required!')
		.min(2, 'The name minimum 2 characters!'),
	description: yup.string().notRequired(),
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
});

function later(delay) {
	return new Promise(function (resolve) {
		setTimeout(resolve, delay);
	});
}

// DELETE CATEGORY MODAL
const DeleteCategoryModal = (props) => {
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

	const deleteCategory = async (data, e) => {
		e.preventDefault();

		const { id } = data;

		await later(3000);
		CategoryService.destroy(id)
			.then((response) => {
				if (response.status === 200) {
					props.setShow(false);
					reset();
					toast.success('Category successfully deleted!', {
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
				props.setCategory([]);
				props.setShow(false);
			}}
			aria-labelledby="example-modal-sizes-title-lg"
		>
			<Form onSubmit={handleSubmit(deleteCategory)}>
				<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-lg">
						Delete Category
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Are you sure delete{' '}
					<span className="font-weight-bold">"{props.category.name}"</span> ?
					<Form.Control
						type="hidden"
						name="id"
						defaultValue={props.category.id}
						ref={register}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => {
							props.setCategory([]);
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

// EDIT CATEGORY MODAL
const EditCategoryModal = (props) => {
	const { register, handleSubmit, formState, reset, errors } = useForm({
		resolver: yupResolver(schema),
	});

	const mounted = useRef(false);
	// const inputRef = useRef();

	const [fileName, setFileName] = useState('Choose Photo');
	const [tempoImg, setTempoImg] = useState();

	useEffect(() => {
		if (!mounted.current) {
			// mounting
			// if (props.show) inputRef.current.focus();
		} else {
			// updating
		}
	});

	const updateCategory = async (data, e) => {
		e.preventDefault();

		data.photo = data.photo[0];

		const formData = new FormData();
		for (const [key, value] of Object.entries(data)) {
			formData.append(key, value);
		}
		formData.append('_method', 'PUT');

		await later(3000);
		CategoryService.update(formData, data.id)
			.then((response) => {
				if (response.status === 200) {
					props.setShow(false);
					reset();
					toast.success('Category successfully update!', {
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

	const showTempoImg = (img) => {
		let reader = new FileReader();

		reader.readAsDataURL(img);
		reader.onloadend = () => {
			setTempoImg(reader.result);
		};
	};

	return (
		<Modal
			animation={false}
			dialogClassName="modal-90w"
			scrollable={false}
			show={props.show}
			onHide={() => {
				props.setCategory([]);
				props.setShow(false);
			}}
			aria-labelledby="example-modal-sizes-title-lg"
		>
			<Form onSubmit={handleSubmit(updateCategory)}>
				<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-lg">
						Form Edit Category
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Control
						type="hidden"
						name="id"
						defaultValue={props.category.id}
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
										defaultValue={props.category.name}
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
						</Row>
					</Container>

					<Container fluid>
						<Row>
							<Col>
								<Form.Group controlId="description">
									<Form.Label>Edit Description</Form.Label>
									<Form.Control
										as="textarea"
										name="description"
										defaultValue={props.category.description}
										isInvalid={errors.description ? true : false}
										placeholder="Enter Description"
										ref={register}
										rows={5}
									/>
									{errors.description && (
										<Form.Control.Feedback type="invalid">
											&#9888; {errors.description.message}
										</Form.Control.Feedback>
									)}
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
							props.setCategory([]);
							props.setShow(false);
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

const Category = (props) => {
	const { register, handleSubmit, formState, reset, errors } = useForm({
		resolver: yupResolver(schema),
	});

	const mounted = useRef(false);

	const [fileName, setFileName] = useState('Choose Photo');
	const [tempoImg, setTempoImg] = useState();

	const [lgShow, setModalShow] = useState(false);
	const [showCategoryModal, setEditCategoryModal] = useState(false);
	const [showDeleteCategoryModal, setDeleteCategoryModal] = useState(false);

	const [data, setData] = useState([]);
	const [categories, setCategory] = useState([]);

	const [loading, setLoading] = useState(true);

	const showTempoImg = (img) => {
		let reader = new FileReader();

		reader.readAsDataURL(img);
		reader.onloadend = () => {
			setTempoImg(reader.result);
		};
	};

	const submitCategory = async (data, e) => {
		e.preventDefault();

		data.photo = data.photo[0];

		const formData = new FormData();
		for (const [key, value] of Object.entries(data)) {
			formData.append(key, value);
		}

		await later(3000);
		CategoryService.store(formData)
			.then((response) => {
				if (response.status === 200) {
					setModalShow(false);
					setFileName('');
					setTempoImg('');
					reset();
					toast.success('Category successfully created!', {
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
		CategoryService.getCategories()
			.then((response) => {
				setData(response.data.categories);
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

	return (
		<React.Fragment>
			<Toaster position="top-center" />
			<h1 className="h3 mb-0 text-gray-800 mb-3">Category</h1>

			<div className="mb-2">
				<Button variant="primary" onClick={() => setModalShow(true)}>
					Add Category
				</Button>

				<Modal
					animation={false}
					show={lgShow}
					onHide={() => setModalShow(false)}
					dialogClassName="modal-90w"
					scrollable={false}
				>
					<Form onSubmit={handleSubmit(submitCategory)}>
						<Modal.Header closeButton>
							<Modal.Title id="example-modal-sizes-title-lg">
								Form Entri Category
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
								</Row>
							</Container>

							<Container fluid>
								<Row>
									<Col>
										<Form.Group controlId="description">
											<Form.Label>Description</Form.Label>
											<Form.Control
												as="textarea"
												name="description"
												isInvalid={errors.description ? true : false}
												placeholder="Enter Description"
												ref={register}
												rows={5}
											/>
											{errors.description && (
												<Form.Control.Feedback type="invalid">
													&#9888; {errors.description.message}
												</Form.Control.Feedback>
											)}
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
									setModalShow(false);
									setFileName('');
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

			{/* List data category */}
			<div className="card shadow mb-4">
				<div className="card-header py-3">
					<h6 className="m-0 font-weight-bold text-dark">List of Categories</h6>
				</div>
				<div className="card-body">
					{loading ? (
						<div className="text-center">
							<LoaderData />
						</div>
					) : (
						<TableCategory
							data={data}
							setShow={setEditCategoryModal}
							setDeleteShow={setDeleteCategoryModal}
							setCategory={setCategory}
							editModal={
								<EditCategoryModal
									show={showCategoryModal}
									setShow={setEditCategoryModal}
									category={categories}
									setCategory={setCategory}
								/>
							}
							deleteModal={
								<DeleteCategoryModal
									show={showDeleteCategoryModal}
									setShow={setDeleteCategoryModal}
									category={categories}
									setCategory={setCategory}
								/>
							}
						/>
					)}
				</div>
			</div>
		</React.Fragment>
	);
};

export default Category;
