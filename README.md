# Spotify extended player

[![Deployment](https://github.com/magnuspaal/spotify-extended-player/actions/workflows/ci.yml/badge.svg)](https://github.com/magnuspaal/spotify-extended-player/actions/workflows/ci.yml)

[DEMO](https://magnuspaal.com/spotify?)

## Development

1. Install dependencies of both projects with `npm install`
2. Set spotify client id and secret in `.env.local` file.
3. Start mongo with `docker-compose -f docker-compose.mongo.yml --env-file ./back/.env.local up`
4. Start backend with `npm run start`
5. `cp ./front/.env.example ./front/.env`
6. Start the frontend with `npm run start`

## Production

1. Define environment variables in `.env` files of both projects using `.env.local` as a template in the backend and `.env.example` in the frontend.
2. Setup an external docker network for use with nginx, and also set the name of it in back-end env.
3. Install dependencies and build both projects

   ```
   npm install

   npm run build
   ```

4. Start containers with `docker-compose --env-file ./back/.env -d up`
