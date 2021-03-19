import { CashierApi } from '../api';

class CategoryService {
	getCategories() {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		return CashierApi.get(`api/categories`, config);
	}

	store(request) {
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		return CashierApi.post(`api/categories`, request, config);
	}

	show(id) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		return CashierApi.get(`api/categories/${id}`, config);
	}

	update(request, id) {
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		return CashierApi.post(`api/categories/${id}`, request, config);
	}

	destroy(id) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		return CashierApi.delete(`api/categories/${id}`, config);
	}
}

export default new CategoryService();
