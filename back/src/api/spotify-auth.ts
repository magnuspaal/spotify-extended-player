import request from "request";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

const SPOTIFYCLIENTID = process.env.SPOTIFYCLIENTID,
	SPOTIFYCLIENTSECRET = process.env.SPOTIFYCLIENTSECRET;

class SpotifyAuth {
	constructor() {}

	post(
		form: Object,
		req: Request,
		res: Response,
		callbackResolve: (body: any) => void,
		callbackReject?: (error: any, body: any) => void
	) {
		request.post(
			{
				url: "https://accounts.spotify.com/api/token",
				form,
				headers: {
					Authorization:
						"Basic " +
						Buffer.from(SPOTIFYCLIENTID + ":" + SPOTIFYCLIENTSECRET).toString(
							"base64"
						),
					"Content-Type": "application/x-www-form-urlencoded",
				},
				json: true,
			},
			(error: any, response: any, body: any) => {
				console.log(response.statusCode);
				if (!error && response.statusCode === 200) {
					return callbackResolve(body);
				} else {
					if (callbackReject) return callbackReject(error, body);
					return res.send({ message: body.error_description });
				}
			}
		);
	}
}

const spotifyAuth = new SpotifyAuth();
export { spotifyAuth };
