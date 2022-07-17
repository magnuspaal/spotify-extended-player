import { Toast, ToastContainer, Collapse } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setNotification } from "../store/notification";

export default function App() {
	const open = useSelector((state: RootState) => state.notification.open);
	const message = useSelector((state: RootState) => state.notification.message);
	const dispatch = useDispatch();

	return (
		<>
			<ToastContainer position="top-end" className="p-3">
				<Toast
					show={open}
					animation={true}
					bg="danger"
					autohide
					delay={5000}
					onClose={() =>
						dispatch(setNotification({ open: false, message: "" }))
					}
					transition={Collapse}
				>
					<Toast.Body> {message}</Toast.Body>
				</Toast>
			</ToastContainer>
		</>
	);
}
