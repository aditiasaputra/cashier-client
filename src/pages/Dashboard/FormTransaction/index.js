import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Button, Spinner, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TransactionService } from '../../../service';
import { useSelector } from 'react-redux';
import './form-transaction.scss';
import { selectAuth } from '../../../features/auth/authSlice';

// Schema for validation
const schema = yup.object().shape({
	cashier_name: yup
		.string()
		.required('The cashier name is required!')
		.min(2, 'The cashier name minimum 2 characters!'),
	user_id: yup
		.number('The user ID must be number!')
		.typeError('Must be specify a number')
		.required('The user ID is required!')
		.positive('The user ID must be positive number!')
		.integer()
		.min(1, 'The user ID minimum is 1000!'),
	product_id: yup
		.number('The product ID must be number!')
		.typeError('Must be specify a number')
		.required('The product ID is required!')
		.positive('The product ID must be positive number!')
		.integer()
		.min(1, 'The product ID minimum is 1000!'),
	quantity: yup
		.number('The quantity must be number!')
		.typeError('Must be specify a number')
		.required('The quantity is required!')
		.positive('The quantity must be positive number!')
		.integer()
		.min(1, 'The quantity minimum is 1000!'),
	price: yup
		.number('The price must be number!')
		.typeError('Must be specify a number')
		.required('The price is required!')
		.positive('The price must be positive number!')
		.integer()
		.min(1, 'The price minimum is 1000!'),
	total: yup
		.number('The total must be number!')
		.typeError('Must be specify a number')
		.required('The total is required!')
		.positive('The total must be positive number!')
		.integer()
		.min(1, 'The total minimum is 1000!'),
	payment: yup
		.number('The payment must be number!')
		.typeError('Must be specify a number')
		.required('The payment is required!')
		.positive('The payment must be positive number!')
		.integer()
		.min(1, 'The payment minimum is 1000!'),
	change: yup
		.number('The paymeny change must be number!')
		.typeError('Must be specify a number')
		.required('The paymeny change is required!')
		.positive('The paymeny change must be positive number!')
		.integer()
		.min(1, 'The paymeny change minimum is 1000!'),
});

function later(delay) {
	return new Promise(function (resolve) {
		setTimeout(resolve, delay);
	});
}

const FormTransaction = (props) => {
	const { register, handleSubmit, formState, reset, errors } = useForm({
		resolver: yupResolver(schema),
	});

	const { user } = useSelector(selectAuth);

	const mounted = useRef(false);

	const [users, setUsers] = useState([]);
	const [data, setData] = useState([]);

	const [productSelected, setProductSelected] = useState('');
	const [quantity, setQuantity] = useState('');
	const [payment, setPayment] = useState('');

	const submitTransaction = async (data, e) => {
		e.preventDefault();
		// console.log(data);

		const formData = new FormData();
		for (const [key, value] of Object.entries(data)) {
			formData.append(key, value);
		}

		await later(3000);
		TransactionService.store(formData)
			.then((response) => {
				if (response.status === 200) {
					reset();
					setProductSelected('');
					setQuantity('');
					setPayment('');
					toast.success('Transaction successfully created!', {
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
		TransactionService.getTransactions()
			.then((response) => {
				setUsers(response.data.users);
				setData(response.data.products);
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
			{/* <h1 className="h3 mb-0 text-gray-800 mb-3">Form Entri Transaction</h1> */}

			<div className="card shadow mb-4">
				<div className="card-header py-3">
					<h6 className="m-0 font-weight-bold text-dark">
						Form Entri Transaction
					</h6>
				</div>
				<div className="card-body">
					<Form onSubmit={handleSubmit(submitTransaction)}>
						<Container fluid>
							<Row>
								<Col>
									<Form.Group controlId="cashier_name">
										<Form.Label>Cashier Name</Form.Label>
										<Form.Control
											type="text"
											name="cashier_name"
											defaultValue={user.name}
											isInvalid={errors.cashier_name ? true : false}
											readOnly
											ref={register}
										/>
										{errors.cashier_name && (
											<Form.Control.Feedback type="invalid">
												&#9888; {errors.cashier_name.message}
											</Form.Control.Feedback>
										)}
									</Form.Group>
								</Col>
								<Col>
									<Form.Group controlId="user_id">
										<Form.Label>Customer</Form.Label>
										<Form.Control
											as="select"
											name="user_id"
											isInvalid={errors.user_id ? true : false}
											ref={register}
										>
											<option value={''}>Select Customer</option>
											{users.map((i, v) => {
												return (
													<option key={v} value={i.id}>
														{i.id} / {i.name}
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
							</Row>
						</Container>

						<Container fluid>
							<Row>
								<Col>
									<Form.Group controlId="product_id">
										<Form.Label>Code Product</Form.Label>
										<Form.Control
											as="select"
											name="product_id"
											isInvalid={errors.product_id ? true : false}
											ref={register}
											onChange={(e) => {
												const selectProduct = data.find(
													(el) => el.id === parseInt(e.target.value, 10)
												);
												setProductSelected(selectProduct);
											}}
										>
											<option value={''}>Select Code Product</option>
											{data.map((i, v) => {
												return (
													<option key={v} value={i.id}>
														{i.id} / {i.name}
													</option>
												);
											})}
										</Form.Control>
										{errors.product_id && (
											<Form.Text className="text-danger">
												&#9888; {errors.product_id.message}
											</Form.Text>
										)}
									</Form.Group>
								</Col>
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
							</Row>
						</Container>

						<Container>
							<Row>
								<Col>
									<Form.Group controlId="price">
										<Form.Label>Price</Form.Label>
										<Form.Control
											type="number"
											name="price"
											ref={register}
											isInvalid={errors.price ? true : false}
											readOnly
											defaultValue={productSelected.price || ''}
										/>
										{errors.price && (
											<Form.Control.Feedback type="invalid">
												&#9888; {errors.price.message}
											</Form.Control.Feedback>
										)}
									</Form.Group>
								</Col>
								<Col>
									<Form.Group controlId="total">
										<Form.Label>Total</Form.Label>
										<Form.Control
											type="number"
											name="total"
											ref={register}
											isInvalid={errors.total ? true : false}
											defaultValue={
												parseInt(productSelected.price) * quantity || ''
											}
											readOnly
										/>
										{errors.total && (
											<Form.Control.Feedback type="invalid">
												&#9888; {errors.total.message}
											</Form.Control.Feedback>
										)}
									</Form.Group>
								</Col>
							</Row>
						</Container>

						<Container>
							<Row>
								<Col>
									<Form.Group controlId="payment">
										<Form.Label>Payment</Form.Label>
										<Form.Control
											type="number"
											name="payment"
											isInvalid={errors.payment ? true : false}
											onChange={(e) => setPayment(parseInt(e.target.value, 10))}
											ref={register}
										/>
										{errors.payment && (
											<Form.Control.Feedback type="invalid">
												&#9888; {errors.payment.message}
											</Form.Control.Feedback>
										)}
									</Form.Group>
								</Col>
								<Col>
									<Form.Group controlId="change">
										<Form.Label>Change</Form.Label>
										<Form.Control
											type="number"
											name="change"
											isInvalid={errors.change ? true : false}
											readOnly
											defaultValue={
												payment - parseInt(productSelected.price) * quantity ||
												''
											}
											ref={register}
										/>
										{errors.change && (
											<Form.Control.Feedback type="invalid">
												&#9888; {errors.change.message}
											</Form.Control.Feedback>
										)}
									</Form.Group>
								</Col>
							</Row>
						</Container>

						<Container>
							<Row>
								<Col>
									<hr />
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
								</Col>
								<Col>
									<Button
										variant="secondary"
										className="btn-block"
										onClick={() => {
											reset();
											setProductSelected('');
											setQuantity('');
											setPayment('');
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

export default FormTransaction;
