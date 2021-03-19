import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	showPlaceholder,
	selectAuth,
	clearState,
	requestLogout,
} from '../../../features/auth/authSlice';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';

const LogoutAlert = ({ title, classLink, classIcon }) => {
	const dispatch = useDispatch();
	const { placeholder } = useSelector(selectAuth);

	const [show, setShow] = useState(false);

	const handleClose = () => {
		setShow(false);
	};
	const handleShow = (e) => {
		e.preventDefault();
		setShow(true);
	};

	const handleLogout = async (e) => {
		e.preventDefault();
		setShow(false);
		dispatch(showPlaceholder(false));
		toast.loading('Loading...', { duration: 3000 });
		if (placeholder) {
			dispatch(requestLogout());
			dispatch(clearState());
		}
		// checkPlaceholder();
	};

	// function checkPlaceholder() {
	// 	if (placeholder === true) {
	// 		toast.loading('Loading...', { duration: 2000 });
	// 		dispatch(requestLogout());
	// 		dispatch(clearState());
	// 	}
	// }

	return (
		<React.Fragment>
			<Toaster position="top-center" />

			<Link to="#" className={classLink} onClick={handleShow}>
				<i className={classIcon} />
				{title}
			</Link>

			<Modal animation={false} show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Ready to Leave?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Select "Logout" below if you are ready to end your current session.
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button variant="primary" href="/login" onClick={handleLogout}>
						Logout
					</Button>
				</Modal.Footer>
			</Modal>
		</React.Fragment>
	);
};

export default LogoutAlert;
