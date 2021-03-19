import { CashierApi } from '../api';

class UserService {
	getUsers() {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		return CashierApi.get(`api/users`, config);
	}

	store(request) {
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		console.log(request);
		return CashierApi.post(`api/users`, request, config);
	}

	show(id) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		return CashierApi.get(`api/users/${id}`, config);
	}

	update(request, id) {
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		return CashierApi.post(`api/users/${id}`, request, config);
	}

	destroy(id) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		return CashierApi.delete(`api/users/${id}`, config);
	}
}

export default new UserService();
