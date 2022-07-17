import React, { useEffect, useState } from "react";
import { IDetails } from "../types";
import axiosClient from "../config/axios";
import DetailPercentage from "./DetailPercentage";

function Details(props: { id: number }) {
	const [details, setDetails] = useState<IDetails>();

	useEffect(() => {
		const getSongDetails = async () => {
			axiosClient.get(`/track/features?id=${props.id}`).then((response) => {
				setDetails(response.data);
			});
		};

		getSongDetails();
	}, [props.id]);

	const percentages = details
		? [
				{ label: "Acousticness", amount: details.acousticness },
				{ label: "Instrumentalness", amount: details.instrumentalness },
				{ label: "Speechiness", amount: details.speechiness },
				{ label: "Danceability", amount: details.danceability },
				{ label: "Energy", amount: details.energy },
				{ label: "Liveness", amount: details.liveness },
				{ label: "Valence", amount: details.valence },
		  ]
		: undefined;

	return (
		<>
			<div className="mt-lg-3">
				{percentages && (
					<>
						{percentages.map((item, index) => (
							<DetailPercentage
								key={index}
								label={item.label}
								amount={item.amount}
							/>
						))}
					</>
				)}
			</div>
		</>
	);
}

export default Details;
