import { useEffect, useState } from "react";
import axiosClient from "../config/axios";
import Loading from "./Loading";

import { IPlaybackState, ISong } from "../types";

import { Col, Container, Row, ProgressBar, Nav } from "react-bootstrap";

import Lyrics from "../components/Lyrics";
import Details from "../components/Details";

function Main() {
	const [song, setSong] = useState<ISong>();
	const [playbackState, setPlaybackState] = useState<IPlaybackState>();
	const [selectedTab, setSelectedTab] = useState<string | undefined>("Lyrics");

	useEffect(() => {
		const interval = setInterval(async () => {
			updateSong();
		}, 1000);

		return () => clearInterval(interval);
	});

	const handleSelect = (eventKey: any) => setSelectedTab(eventKey);

	const updateSong = async () => {
		await getPlaybackState();
	};

	const getPlaybackState = async () => {
		return axiosClient.get(`/player`).then((response) => {
			setPlaybackState(response.data);
			setSong(response.data.item);
			return response.data.item;
		});
	};

	const getPlaybackPercentage = (progress: number, length: number) =>
		(progress / length) * 100;

	return (
		<>
			{song ? (
				<Container
					fluid
					className="align-items-start"
					style={{ height: "100%", padding: "5%", width: "100%" }}
				>
					<Row
						className="d-flex justify-content-center"
						style={{ height: "100%" }}
					>
						<Col xs="6" md="4" lg="3">
							<img
								className="album-image"
								src={song.album.images[0].url}
								alt={song.name}
								style={{ width: "100%" }}
							></img>
							{playbackState && song && (
								<ProgressBar
									now={getPlaybackPercentage(
										playbackState.progress_ms,
										song.duration_ms
									)}
									bsPrefix="song-progress"
								/>
							)}
							<div className="d-none d-sm-block">
								<div className="h3">{song.name}</div>
								<div className="h6 mb-lg-3">{song.artists[0].name}</div>
							</div>
						</Col>
						<Col xs="6" md="1" lg="1" className="d-block d-sm-none">
							<div className="mt-lg-3">
								<div className="h3">{song.name}</div>
								<div className="h6 mb-lg-3">{song.artists[0].name}</div>
							</div>
						</Col>
						<Col
							xs="12"
							md="7"
							sm="6"
							lg="8"
							className="d-flex align-items-center flex-column stacked-height"
						>
							<Nav
								variant="pills"
								activeKey={selectedTab}
								onSelect={handleSelect}
								className="mb-5"
							>
								<Nav.Item>
									<Nav.Link eventKey="Lyrics">Lyrics</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="Details">Details</Nav.Link>
								</Nav.Item>
							</Nav>
							{selectedTab === "Lyrics" && playbackState && (
								<div
									className="d-flex align-items-center flex-column no-scroll-bar"
									style={{ overflowY: "scroll" }}
								>
									<Lyrics
										progressMs={playbackState.progress_ms}
										trackName={song.name}
										artist={song.artists[0].name}
									></Lyrics>
								</div>
							)}
							{selectedTab === "Details" && <Details id={song.id} />}
						</Col>
					</Row>
				</Container>
			) : (
				<Loading />
			)}
		</>
	);
}

export default Main;
