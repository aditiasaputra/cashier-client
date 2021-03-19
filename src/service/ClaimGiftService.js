import { CashierApi } from '../api';

class ClaimGiftService {
	getClaimGifts() {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		return CashierApi.get(`api/claim-gifts`, config);
	}

	store(request) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		return CashierApi.post(`api/claim-gifts`, request, config);
	}

	show(id) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		return CashierApi.get(`api/claim-gifts/${id}`, config);
	}

	update(request, id) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		return CashierApi.put(`api/claim-gifts/${id}`, request, config);
	}

	destroy(id) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		return CashierApi.delete(`api/claim-gifts/${id}`, config);
	}
}

export default new ClaimGiftService();
