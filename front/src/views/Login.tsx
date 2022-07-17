import { Container, Button } from "react-bootstrap";
import { baseURL } from "../config/axios";

function Login() {
	return (
		<Container
			className="d-flex flex-column justify-content-center align-items-center"
			style={{ height: "100%" }}
		>
			<Button variant="primary" href={`${baseURL}/auth/login`}>
				Login with Spotify
			</Button>
		</Container>
	);
}

export default Login;
