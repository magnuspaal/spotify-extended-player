import request from "request";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

class SpotifyApi {
	constructor() {}

	get(
		path: string,
		req: Request,
		res: Response,
		callbackResolve?: (body: any) => void,
		callbackReject?: (error: any, response: any, body: any) => void
	) {
		request.get(
			{
				url: "https://api.spotify.com/v1" + path,
				headers: {
					Authorization: req.headers.authorization,
					"Content-Type": "application/json",
				},
				json: true,
			},
			(error: any, response: any, body: any) => {
				if (
					!error &&
					(response.statusCode === 200 || response.statusCode === 204)
				) {
					if (callbackResolve) return callbackResolve(body);
					if (body) return res.send(body);
					else return res.send();
				} else {
					if (callbackReject) return callbackReject(error, response, body);
					res.status(body?.error?.status | 500);
					return res.send({
						message: body?.error?.message || "Unexpected error",
					});
				}
			}
		);
	}
}

const spotifyApi = new SpotifyApi();
export default spotifyApi;
