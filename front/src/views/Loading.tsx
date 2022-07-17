import React from "react";
import { Spinner } from "react-bootstrap";

function Login() {
	return (
		<div
			className="d-flex justify-content-center align-items-center"
			style={{ height: "100%" }}
		>
			<Spinner animation="grow" style={{ height: "100px", width: "100px" }} />
		</div>
	);
}

export default Login;
