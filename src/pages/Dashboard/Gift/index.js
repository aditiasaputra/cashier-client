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
import { GiftService } from '../../../service';
import './gift.scss';
import TableGift from '../../../components/molecules/TableGift';

// Schema for validation
const schema = yup.object().shape({
	name: yup
		.string()
		.required('The name is required!')
		.min(2, 'The name minimum 2 characters!'),
	point: yup
		.number('The weight must be number!')
		.typeError('Must be specify a number')
		.required('The price is required!')
		.positive('The weight must be positive number!')
		.integer()
		.min(1, 'The weight minimum is 1 grams!'),
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

// DELETE GIFT MODAL
const DeleteGiftModal = (props) => {
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

	const deleteGift = async (data, e) => {
		e.preventDefault();

		const { id } = data;

		await later(3000);
		GiftService.destroy(id)
			.then((response) => {
				if (response.status === 200) {
					props.setShow(false);
					reset();
					toast.success('Gift successfully deleted!', {
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
				props.setGift([]);
				props.setShow(false);
			}}
			aria-labelledby="example-modal-sizes-title-lg"
		>
			<Form onSubmit={handleSubmit(deleteGift)}>
				<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-lg">
						Delete Gift
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Are you sure delete{' '}
					<span className="font-weight-bold">"{props.gift.name}"</span> ?
					<Form.Control
						type="hidden"
						name="id"
						defaultValue={props.gift.id}
						ref={register}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => {
							props.setGift([]);
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

// EDIT GIFT MODAL
const EditGiftModal = (props) => {
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

	const updateGift = async (data, e) => {
		e.preventDefault();

		data.photo = data.photo[0];

		const formData = new FormData();
		for (const [key, value] of Object.entries(data)) {
			formData.append(key, value);
		}
		formData.append('_method', 'PUT');

		await later(3000);
		GiftService.update(formData, data.id)
			.then((response) => {
				if (response.status === 200) {
					props.setShow(false);
					reset();
					toast.success('Gift successfully update!', {
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
				props.setGift([]);
				props.setShow(false);
			}}
			aria-labelledby="example-modal-sizes-title-lg"
		>
			<Form onSubmit={handleSubmit(updateGift)}>
				<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-lg">
						Form Edit Gift
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Control
						type="hidden"
						name="id"
						defaultValue={props.gift.id}
						ref={register}
					/>
					<Container fluid>
						<Row>
							<Col>
								<Form.Group controlId="name">
									<Form.Label>Name</Form.Label>
									<Form.Control
										autoFocus
										type="text"
										name="name"
										defaultValue={props.gift.name}
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
								<Form.Group controlId="point">
									<Form.Label>Point</Form.Label>
									<Form.Control
										type="number"
										name="point"
										defaultValue={props.gift.point}
										isInvalid={errors.point ? true : false}
										placeholder="Enter Point"
										ref={register}
										rows={5}
									/>
									{errors.point && (
										<Form.Control.Feedback type="invalid">
											&#9888; {errors.point.message}
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
										defaultValue={props.gift.stock}
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
							props.setGift([]);
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

const Gift = (props) => {
	const { register, handleSubmit, formState, reset, errors } = useForm({
		resolver: yupResolver(schema),
	});

	const mounted = useRef(false);

	const [fileName, setFileName] = useState('Choose Photo');
	const [tempoImg, setTempoImg] = useState();

	const [lgShow, setModalShow] = useState(false);
	const [showGiftModal, setEditGiftModal] = useState(false);
	const [showDeleteGiftModal, setDeleteGiftModal] = useState(false);

	const [data, setData] = useState([]);
	const [gifts, setGift] = useState([]);

	const [loading, setLoading] = useState(true);

	const showTempoImg = (img) => {
		let reader = new FileReader();

		reader.readAsDataURL(img);
		reader.onloadend = () => {
			setTempoImg(reader.result);
		};
	};

	const submitGift = async (data, e) => {
		e.preventDefault();

		data.photo = data.photo[0];

		const formData = new FormData();
		for (const [key, value] of Object.entries(data)) {
			formData.append(key, value);
		}

		await later(3000);
		GiftService.store(formData)
			.then((response) => {
				if (response.status === 200) {
					setModalShow(false);
					setFileName('');
					setTempoImg('');
					reset();
					toast.success('Gift successfully created!', {
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
		GiftService.getGifts()
			.then((response) => {
				setData(response.data.gifts);
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
			<h1 className="h3 mb-0 text-gray-800 mb-3">Gift</h1>

			<div className="mb-2">
				<Button variant="primary" onClick={() => setModalShow(true)}>
					Add Gift
				</Button>

				<Modal
					animation={false}
					show={lgShow}
					onHide={() => setModalShow(false)}
					dialogClassName="modal-90w"
					scrollable={false}
				>
					<Form onSubmit={handleSubmit(submitGift)}>
						<Modal.Header closeButton>
							<Modal.Title id="example-modal-sizes-title-lg">
								Form Entri Gift
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
										<Form.Group controlId="point">
											<Form.Label>Point</Form.Label>
											<Form.Control
												type="number"
												name="point"
												isInvalid={errors.point ? true : false}
												placeholder="Enter Point"
												ref={register}
												rows={5}
											/>
											{errors.point && (
												<Form.Control.Feedback type="invalid">
													&#9888; {errors.point.message}
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

			{/* List data gift */}
			<div className="card shadow mb-4">
				<div className="card-header py-3">
					<h6 className="m-0 font-weight-bold text-dark">List of Gifts</h6>
				</div>
				<div className="card-body">
					{loading ? (
						<div className="text-center">
							<LoaderData />
						</div>
					) : (
						<TableGift
							data={data}
							setShow={setEditGiftModal}
							setDeleteShow={setDeleteGiftModal}
							setGift={setGift}
							editModal={
								<EditGiftModal
									show={showGiftModal}
									setShow={setEditGiftModal}
									gift={gifts}
									setGift={setGift}
								/>
							}
							deleteModal={
								<DeleteGiftModal
									show={showDeleteGiftModal}
									setShow={setDeleteGiftModal}
									gift={gifts}
									setGift={setGift}
								/>
							}
						/>
					)}
				</div>
			</div>
		</React.Fragment>
	);
};

export default Gift;
