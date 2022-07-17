/* eslint-disable no-param-reassign */
import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
} from "axios";

import { store } from "../store";
import { setNotification } from "../store/notification";

export const baseURL = process.env.REACT_APP_API_URL;

const config: AxiosRequestConfig = {
	baseURL,
	withCredentials: true,
};

const axiosClient: AxiosInstance = axios.create(config);

axiosClient.interceptors.request.use(
	async (value: AxiosRequestConfig) => {
		const token = store.getState().auth.token;
		const secret = store.getState().auth.secret;
		value.headers = { Authorization: `Bearer ${token}:${secret}` };
		return value;
	},
	(error) => {
		Promise.reject(error);
	}
);

axiosClient.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error: AxiosError<{ message: string }>) => {
		let message = error.response?.data.message || "Unexpected error";
		if (error.response?.status === 502) {
			message = "Can't connect to the server";
		}
		store.dispatch(
			setNotification({
				open: true,
				message: message,
			})
		);
		return error;
	}
);

export default axiosClient;
