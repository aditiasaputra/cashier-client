import { CashierApi } from '../api';

class TransactionService {
	getTransactions() {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		return CashierApi.get(`api/transactions`, config);
	}

	store(request) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		return CashierApi.post(`api/transactions`, request, config);
	}

	show(id) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		return CashierApi.get(`api/transactions/${id}`, config);
	}

	update(request, id) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		return CashierApi.put(`api/transactions/${id}`, request, config);
	}

	destroy(id) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		return CashierApi.delete(`api/transactions/${id}`, config);
	}
}

export default new TransactionService();
