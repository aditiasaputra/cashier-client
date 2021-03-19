import { CashierApi } from '../api';

class ProductService {
	getProducts() {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		return CashierApi.get(`api/products`, config);
	}

	store(request) {
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		return CashierApi.post(`api/products`, request, config);
	}

	show(id) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		return CashierApi.get(`api/products/${id}`, config);
	}

	update(request, id) {
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		return CashierApi.post(`api/products/${id}`, request, config);
	}

	destroy(id) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		return CashierApi.delete(`api/products/${id}`, config);
	}
}

export default new ProductService();
