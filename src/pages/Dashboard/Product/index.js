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
import { ProductService } from '../../../service';
import './product.scss';
import TableProduct from '../../../components/molecules/TableProduct';

// Schema for validation
const schema = yup.object().shape({
	name: yup
		.string()
		.required('The name is required!')
		.min(2, 'The name minimum 2 characters!'),
	weight: yup
		.number('The weight must be number!')
		.typeError('Must be specify a number')
		.required('The price is required!')
		.positive('The weight must be positive number!')
		.integer()
		.min(1, 'The weight minimum is 1 grams!'),
	price: yup
		.number('The price must be number!')
		.typeError('Must be specify a number')
		.required('The price is required!')
		.positive('The price must be positive number!')
		.integer()
		.min(1, 'The price minimum is 1000!'),
	stock: yup
		.number('The stock must be number!')
		.typeError('Must be specify a number')
		.required('The stock is required!')
		.positive('The stock must be positive number!')
		.integer()
		.min(1, 'The stock minimum is 1!'),
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

// DELETE PRODUCT MODAL
const DeleteProductModal = (props) => {
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

	const deleteProduct = async (data, e) => {
		e.preventDefault();

		const { id } = data;

		await later(3000);
		ProductService.destroy(id)
			.then((response) => {
				if (response.status === 200) {
					props.setShow(false);
					reset();
					toast.success('Product successfully deleted!', {
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
				props.setProduct([]);
				props.setShow(false);
			}}
			aria-labelledby="example-modal-sizes-title-lg"
		>
			<Form onSubmit={handleSubmit(deleteProduct)}>
				<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-lg">
						Delete Product
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Are you sure delete{' '}
					<span className="font-weight-bold">"{props.product.name}"</span> ?
					<Form.Control
						type="hidden"
						name="id"
						defaultValue={props.product.id}
						ref={register}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => {
							props.setProduct([]);
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

// EDIT PRODUCT MODAL
const EditProductModal = (props) => {
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

	const updateProduct = async (data, e) => {
		e.preventDefault();

		data.photo = data.photo[0];

		const formData = new FormData();
		for (const [key, value] of Object.entries(data)) {
			formData.append(key, value);
		}
		formData.append('_method', 'PUT');

		await later(3000);
		ProductService.update(formData, data.id)
			.then((response) => {
				if (response.status === 200) {
					props.setShow(false);
					reset();
					toast.success('Product successfully update!', {
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
				props.setProduct([]);
				props.setShow(false);
			}}
			aria-labelledby="example-modal-sizes-title-lg"
		>
			<Form onSubmit={handleSubmit(updateProduct)}>
				<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-lg">
						Form Edit Product
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Control
						type="hidden"
						name="id"
						defaultValue={props.product.id}
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
										defaultValue={props.product.name}
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
								<Form.Group controlId="category_id">
									<Form.Label>Edit Category Product</Form.Label>
									<Form.Control
										as="select"
										name="category_id"
										defaultValue={props.product.category_id}
										isInvalid={errors.product ? true : false}
										ref={register}
									>
										<option value={''}>Select Product</option>
										{props.categories.map((i, v) => {
											return (
												<option key={v} value={i.id}>
													{i.name}
												</option>
											);
										})}
									</Form.Control>

									{errors.product && (
										<Form.Text className="text-danger">
											&#9888; {errors.product.message}
										</Form.Text>
									)}
								</Form.Group>
							</Col>
						</Row>
					</Container>

					<Container fluid>
						<Row>
							<Col>
								<Form.Group controlId="weight">
									<Form.Label>Weight</Form.Label>
									<Form.Control
										type="number"
										name="weight"
										defaultValue={props.product.weight}
										isInvalid={errors.weight ? true : false}
										placeholder="Enter Weight"
										ref={register}
										rows={5}
									/>
									{errors.weight && (
										<Form.Control.Feedback type="invalid">
											&#9888; {errors.weight.message}
										</Form.Control.Feedback>
									)}
								</Form.Group>
							</Col>
							<Col>
								<Form.Group controlId="stock">
									<Form.Label>Stock</Form.Label>
									<Form.Control
										type="number"
										name="stock"
										defaultValue={props.product.stock}
										isInvalid={errors.stock ? true : false}
										placeholder="Enter Stock"
										ref={register}
										rows={5}
									/>
									{errors.stock && (
										<Form.Control.Feedback type="invalid">
											&#9888; {errors.stock.message}
										</Form.Control.Feedback>
									)}
								</Form.Group>
							</Col>
						</Row>
					</Container>

					<Container fluid>
						<Row>
							<Col>
								<Form.Group controlId="price">
									<Form.Label>Price</Form.Label>
									<Form.Control
										type="number"
										name="price"
										defaultValue={props.product.price}
										isInvalid={errors.price ? true : false}
										placeholder="Enter Price"
										ref={register}
										rows={5}
									/>
									{errors.price && (
										<Form.Control.Feedback type="invalid">
											&#9888; {errors.price.message}
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
							props.setProduct([]);
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

const Product = (props) => {
	const { register, handleSubmit, formState, reset, errors } = useForm({
		resolver: yupResolver(schema),
	});

	const mounted = useRef(false);

	const [fileName, setFileName] = useState('Choose Photo');
	const [tempoImg, setTempoImg] = useState();

	const [lgShow, setModalShow] = useState(false);
	const [showProductModal, setEditProductModal] = useState(false);
	const [showDeleteProductModal, setDeleteProductModal] = useState(false);

	const [data, setData] = useState([]);
	const [categories, setCategories] = useState([]);
	const [product, setProduct] = useState([]);

	const [loading, setLoading] = useState(true);

	const showTempoImg = (img) => {
		let reader = new FileReader();

		reader.readAsDataURL(img);
		reader.onloadend = () => {
			setTempoImg(reader.result);
		};
	};

	const submitProduct = async (data, e) => {
		e.preventDefault();

		data.photo = data.photo[0];

		const formData = new FormData();
		for (const [key, value] of Object.entries(data)) {
			formData.append(key, value);
		}

		await later(3000);
		ProductService.store(formData)
			.then((response) => {
				if (response.status === 200) {
					setModalShow(false);
					setFileName('');
					setTempoImg('');
					reset();
					toast.success('Product successfully created!', {
						duration: 3000,
					});
				}
			})
			.catch((error) => {
				console.log(error.response);
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
		ProductService.getProducts()
			.then((response) => {
				setData(response.data.products);
				setCategories(response.data.categories);
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
			<h1 className="h3 mb-0 text-gray-800 mb-3">Product</h1>

			<div className="mb-2">
				<Button variant="primary" onClick={() => setModalShow(true)}>
					Add Product
				</Button>

				<Modal
					animation={false}
					show={lgShow}
					onHide={() => setModalShow(false)}
					dialogClassName="modal-90w"
					scrollable={false}
				>
					<Form onSubmit={handleSubmit(submitProduct)}>
						<Modal.Header closeButton>
							<Modal.Title id="example-modal-sizes-title-lg">
								Form Entri Product
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
										<Form.Group controlId="category">
											<Form.Label>Category</Form.Label>
											<Form.Control
												as="select"
												name="category_id"
												isInvalid={errors.category_id ? true : false}
												ref={register}
											>
												<option value={''}>Select Category Product</option>
												{categories.map((i, v) => {
													return (
														<option key={v} value={i.id}>
															{i.name}
														</option>
													);
												})}
											</Form.Control>

											{errors.category_id && (
												<Form.Text className="text-danger">
													&#9888; {errors.category_id.message}
												</Form.Text>
											)}
										</Form.Group>
									</Col>
								</Row>
							</Container>

							<Container fluid>
								<Row>
									<Col>
										<Form.Group controlId="weight">
											<Form.Label>Weight</Form.Label>
											<Form.Control
												type="number"
												name="weight"
												isInvalid={errors.weight ? true : false}
												placeholder="Enter Weight"
												ref={register}
												rows={5}
											/>
											{errors.weight && (
												<Form.Control.Feedback type="invalid">
													&#9888; {errors.weight.message}
												</Form.Control.Feedback>
											)}
										</Form.Group>
									</Col>
									<Col>
										<Form.Group controlId="stock">
											<Form.Label>Stock</Form.Label>
											<Form.Control
												type="number"
												name="stock"
												isInvalid={errors.stock ? true : false}
												placeholder="Enter Stock"
												ref={register}
												rows={5}
											/>
											{errors.stock && (
												<Form.Control.Feedback type="invalid">
													&#9888; {errors.stock.message}
												</Form.Control.Feedback>
											)}
										</Form.Group>
									</Col>
								</Row>
							</Container>

							<Container fluid>
								<Row>
									<Col>
										<Form.Group controlId="price">
											<Form.Label>Price</Form.Label>
											<Form.Control
												type="number"
												name="price"
												isInvalid={errors.price ? true : false}
												placeholder="Enter Price"
												ref={register}
												rows={5}
											/>
											{errors.price && (
												<Form.Control.Feedback type="invalid">
													&#9888; {errors.price.message}
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

			{/* List data product */}
			<div className="card shadow mb-4">
				<div className="card-header py-3">
					<h6 className="m-0 font-weight-bold text-dark">List of Products</h6>
				</div>
				<div className="card-body">
					{loading ? (
						<div className="text-center">
							<LoaderData />
						</div>
					) : (
						<TableProduct
							data={data}
							setShow={setEditProductModal}
							setDeleteShow={setDeleteProductModal}
							setProduct={setProduct}
							editModal={
								<EditProductModal
									show={showProductModal}
									setShow={setEditProductModal}
									product={product}
									setProduct={setProduct}
									categories={categories}
								/>
							}
							deleteModal={
								<DeleteProductModal
									show={showDeleteProductModal}
									setShow={setDeleteProductModal}
									product={product}
									setProduct={setProduct}
								/>
							}
						/>
					)}
				</div>
			</div>
		</React.Fragment>
	);
};

export default Product;
