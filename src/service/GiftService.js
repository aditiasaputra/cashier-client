import { CashierApi } from '../api';

class GiftService {
	getGifts() {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		return CashierApi.get(`api/gifts`, config);
	}

	store(request) {
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		return CashierApi.post(`api/gifts`, request, config);
	}

	show(id) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		return CashierApi.get(`api/gifts/${id}`, config);
	}

	update(request, id) {
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		return CashierApi.post(`api/gifts/${id}`, request, config);
	}

	destroy(id) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		return CashierApi.delete(`api/gifts/${id}`, config);
	}
}

export default new GiftService();
