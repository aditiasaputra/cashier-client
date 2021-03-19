import axios from 'axios';
import { API_CASHIER } from '../constants';

const CashierApi = axios.create({
	baseURL: `${API_CASHIER || 'https://jsonplaceholder.typicode.com'}`,
});

// HTTP Request
CashierApi.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			// config.headers['Content-Type'] = 'application/json';
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// HTTP Response
// CashierApi.interceptors.response.use(
// 	(response) => {
// 		return response;
// 	},
// 	async (error) => {
// 		const originalRequest = error.config;
// 		if (error.response.status === 403 && !originalRequest._retry) {
// ! // ! FOR REFRESH TOKEN
// originalRequest._retry = true;
// const access_token = await refreshAccessToken();
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
// return CashierApi(originalRequest);
// 		}
// 		return Promise.reject(error);
// 	}
// );

export default CashierApi;
