import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Button, Spinner, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { ClaimGiftService } from '../../../service';
import './claim-gift.scss';

function later(delay) {
	return new Promise(function (resolve) {
		setTimeout(resolve, delay);
	});
}

const FormClaimGift = (props) => {
	const { register, handleSubmit, formState, reset, errors } = useForm();

	const mounted = useRef(false);

	const [users, setUsers] = useState([]);
	const [data, setData] = useState([]);

	const [pointUser, setPointUser] = useState('');
	const [codeGift, setCodeGift] = useState('');
	const [quantity, setQuantity] = useState('');

	const submtiClaimGift = async (data, e) => {
		e.preventDefault();
		// console.log(data);

		const formData = new FormData();
		for (const [key, value] of Object.entries(data)) {
			formData.append(key, value);
		}

		await later(3000);
		ClaimGiftService.store(formData)
			.then((response) => {
				if (response.status === 200) {
					reset();
					setCodeGift('');
					setQuantity('');
					toast.success('Claim gift successfully created!', {
						duration: 3000,
					});
				}
			})
			.catch((error) => {
				if (error.response.status === 400) {
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
		ClaimGiftService.getClaimGifts()
			.then((response) => {
				setUsers(response.data.users);
				setData(response.data.gifts);
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
			{/* <h1 className="h3 mb-0 text-gray-800 mb-3">Form Entri Claim gift</h1> */}

			<div className="card shadow mb-4">
				<div className="card-header py-3">
					<h6 className="m-0 font-weight-bold text-dark">
						Form Entri Claim gift
					</h6>
				</div>
				<div className="card-body">
					<Form onSubmit={handleSubmit(submtiClaimGift)}>
						<Container fluid>
							<Row>
								<Col>
									<Form.Group controlId="user_id">
										<Form.Label>Customer</Form.Label>
										<Form.Control
											as="select"
											name="user_id"
											isInvalid={errors.user_id ? true : false}
											ref={register}
											onChange={(e) => {
												const selectPointUser = users.find(
													(el) => el.id === parseInt(e.target.value, 10)
												);
												setPointUser(selectPointUser);
											}}
										>
											<option value={''}>Select Customer</option>
											{users.map((i, v) => {
												return (
													<option key={v} value={i.id}>
														{i.id} / {i.name} / {i.point}
													</option>
												);
											})}
										</Form.Control>
										{errors.user_id && (
											<Form.Text className="text-danger">
												&#9888; {errors.user_id.message}
											</Form.Text>
										)}
									</Form.Group>
								</Col>
								<Col>
									<Form.Group controlId="gift_id">
										<Form.Label>Code Gift</Form.Label>
										<Form.Control
											as="select"
											name="gift_id"
											isInvalid={errors.gift_id ? true : false}
											ref={register}
											onChange={(e) => {
												const selectCodeGift = data.find(
													(el) => el.id === parseInt(e.target.value, 10)
												);
												setCodeGift(selectCodeGift);
											}}
										>
											<option value={''}>Select Code Gift</option>
											{data.map((i, v) => {
												return (
													<option key={v} value={i.id}>
														{i.id} / {i.name} / {i.point}
													</option>
												);
											})}
										</Form.Control>
										{errors.gift_id && (
											<Form.Text className="text-danger">
												&#9888; {errors.gift_id.message}
											</Form.Text>
										)}
									</Form.Group>
								</Col>
							</Row>
						</Container>

						<Container fluid>
							<Row>
								<Col>
									<Form.Group controlId="quantity">
										<Form.Label>Quantity</Form.Label>
										<Form.Control
											type="number"
											name="quantity"
											defaultValue={0}
											isInvalid={errors.quantity ? true : false}
											placeholder="Enter Quantity"
											onChange={(e) =>
												setQuantity(parseInt(e.target.value, 10))
											}
											ref={register}
										/>
										{errors.quantity && (
											<Form.Text className="text-danger">
												&#9888; {errors.quantity.message}
											</Form.Text>
										)}
									</Form.Group>
								</Col>
								<Col>
									<Form.Group controlId="total_point">
										<Form.Label>Total Point</Form.Label>
										<Form.Control
											type="number"
											name="total_point"
											ref={register}
											isInvalid={errors.total_point ? true : false}
											readOnly
											defaultValue={codeGift.point * quantity || ''}
										/>
										{errors.total_point && (
											<Form.Control.Feedback type="invalid">
												&#9888; {errors.total_point.message}
											</Form.Control.Feedback>
										)}
									</Form.Group>
								</Col>
							</Row>
						</Container>
						<Container className="my-3">
							<Row>
								<Col>
									<hr />
									{pointUser && codeGift ? (
										pointUser.point >= codeGift.point * quantity &&
										codeGift.point * quantity > 0 ? (
											<span className="font-weight-bold text-success text-uppercase">
												Points can be exchanged!
											</span>
										) : (
											<span className="font-weight-bold text-danger text-uppercase">
												Points cannot be exchanged!
											</span>
										)
									) : (
										''
									)}
								</Col>
							</Row>
						</Container>

						<Container>
							<Row>
								<Col>
									<Button
										variant="primary"
										type="submit"
										name="submit"
										className="btn-block"
										disabled={
											pointUser && codeGift
												? pointUser.point >= codeGift.point * quantity &&
												  codeGift.point * quantity > 0
													? false
													: true
												: formState.isSubmitting
										}
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
								</Col>
								<Col>
									<Button
										variant="secondary"
										className="btn-block"
										onClick={() => {
											reset();
											setCodeGift('');
											setQuantity('');
										}}
									>
										Cancel
									</Button>
								</Col>
							</Row>
						</Container>
					</Form>
				</div>
			</div>
		</React.Fragment>
	);
};

export default FormClaimGift;
