import React, { useEffect, useState } from "react";
import { ThemeProvider } from "react-bootstrap";
import axiosClient from "./config/axios";
import Login from "./views/Login";
import Main from "./views/Main";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { setSecret, setToken } from "./store/auth";
import Loading from "./views/Loading";
import NotificationBanner from "./components/NotificationBanner";

export default function App() {
	const [loading, setLoading] = useState(true);
	const token = useSelector((state: RootState) => state.auth.token);
	const dispatch = useDispatch();

	useEffect(() => {
		async function getToken() {
			const secret = localStorage.getItem("secret");
			const token = localStorage.getItem("token");
			const response = await axiosClient.post("/auth/token", {
				secret,
				token,
			});

			if (response.data?.accessToken) {
				dispatch(setToken(response.data.accessToken));
				localStorage.setItem("token", response.data?.accessToken);
				if (secret) dispatch(setSecret(secret));
			}
			setLoading(false);
		}

		setLoading(true);
		const params = new URLSearchParams(window.location.search);
		const secret = params.get("secret");
		const token = params.get("token");

		if (secret && token) {
			localStorage.setItem("secret", secret);
			localStorage.setItem("token", token);
			window.location.search = "";
		}
		getToken();
	}, []);

	const getView = () => {
		if (loading) {
			return <Loading />;
		} else if (token === "") {
			return <Login />;
		} else {
			return <Main />;
		}
	};
	return (
		<>
			<ThemeProvider
				breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
			>
				<NotificationBanner />
				{getView()}
			</ThemeProvider>
		</>
	);
}
