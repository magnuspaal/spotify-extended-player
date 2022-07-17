import { Badge, Row, Col } from "react-bootstrap";

function Details(props: { amount: number; label: string }) {
	const percentage = Math.round(props.amount * 1000) / 10;

	const bgColor = () => {
		if (percentage > 60) {
			return "success";
		} else if (percentage > 30) {
			return "warning";
		} else {
			return "danger";
		}
	};

	return (
		<>
			<Row>
				<Col xs={8}>{props.label}</Col>
				<Col xs="auto">
					<Badge bg={bgColor()} style={{ width: "40px", textAlign: "right" }}>
						{percentage}
					</Badge>
				</Col>
			</Row>
		</>
	);
}

export default Details;
