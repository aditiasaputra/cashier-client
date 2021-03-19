import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CashierApi } from '../../api';

export const requestLogin = createAsyncThunk(
	'user/requestLogin',
	async ({ email, password }, thunkAPI) => {
		try {
			const body = {
				email: email,
				password: password,
			};
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const response = await CashierApi.post(`api/auth/login`, body, config);
			const data = await {
				user: response.data.user,
				roles: response.data.roles,
				access_token: response.data.access_token,
			};

			try {
				localStorage.setItem('token', data.access_token);
				return { ...data };
			} catch (error) {
				return thunkAPI.rejectWithValue(data);
			}
		} catch (e) {
			console.error(e.response);
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
);

export const requestLogout = createAsyncThunk(
	'user/requestLogout',
	async (auth, thunkAPI) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const response = await CashierApi.post(`api/auth/logout`, config);

			if (response.status === 200) {
				localStorage.removeItem('token');
				// window.location = '/login';
				return null;
			} else {
				return thunkAPI.rejectWithValue(response.data);
			}
		} catch (e) {
			// console.error(e);
		}
	}
);

export const fetchUserByToken = createAsyncThunk(
	'user/fetchUserByToken',
	async (token, thunkAPI) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			// console.log(token);
			const response = await CashierApi.get(`api/auth/profile`, config);
			const data = await {
				user: response.data.user,
				roles: response.data.roles,
			};

			if (response.status === 200) {
				// console.log('token valid');
				return { ...data };
			} else {
				// console.log('token invalid');
				return thunkAPI.rejectWithValue(data);
			}
		} catch (e) {
			// console.error(e);
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
);

const initialState = {
	user: [],
	roles: [],
	isFetching: false,
	isSuccess: false,
	isError: false,
	showAlert: false,
	placeholder: false,
	errorMessage: '',
};

export const authSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearState: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isFetching = false;
			state.placeholder = false;

			return state;
		},
		clearAlert: (state) => {
			state.showAlert = false;
		},
		clearMessage: (state) => {
			state.errorMessage = '';
		},
		showPlaceholder: (state, action) => {
			state.placeholder = action.payload;
		},
	},
	extraReducers: {
		// REQUEST LOGIN
		[requestLogin.pending]: (state, action) => {
			state.isFetching = true;
		},
		[requestLogin.rejected]: (state, action) => {
			state.isFetching = true;
			state.isError = true;
			state.errorMessage = action.payload.error;
		},
		[requestLogin.fulfilled]: (state, action) => {
			state.isFetching = false;
			state.isSuccess = true;
			state.showAlert = true;
			state.placeholder = true;

			state.user = action.payload.user;
			state.roles = action.payload.roles;
			return state;
		},

		// REQUEST LOGOUT
		[requestLogout.pending]: (state, action) => {
			state.isFetching = true;
		},
		[requestLogout.rejected]: (state, action) => {
			state.isFetching = false;
			state.isError = true;
			// state.errorMessage = action.payload.message;
		},
		[requestLogout.fulfilled]: (state, action) => {
			state.isFetching = false;
			state.isSuccess = false;

			state.user = null;
			state.roles = null;
		},

		// FETCH USER BY TOKEN
		[fetchUserByToken.pending]: (state, action) => {
			state.isFetching = true;
		},
		[fetchUserByToken.rejected]: (state, action) => {
			state.isFetching = false;
			state.isError = true;
			// state.errorMessage = action.payload.message;
		},
		[fetchUserByToken.fulfilled]: (state, action) => {
			state.isFetching = false;
			state.isSuccess = true;
			state.placeholder = true;

			state.user = action.payload.user;
			state.roles = action.payload.roles;
			return state;
		},
	},
});

export const {
	showPlaceholder,
	clearState,
	clearAlert,
	clearMessage,
} = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
