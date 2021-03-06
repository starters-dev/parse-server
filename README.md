# 🗜 Parse Server Starter

This starter is a minimal setup of [Parse Platform](https://parseplatform.org/) ([Server](https://github.com/parse-community/parse-server) & [Dashboard](https://github.com/parse-community/parse-dashboard)) with a choice of three DB configs: [PostgreSQL](https://www.postgresql.org/) ([Postgis](https://postgis.net/)), [MongoDB](https://www.mongodb.com/) or [Percona Server MongoDB](https://www.percona.com/software/mongodb/percona-server-for-mongodb). All services are run within [Docker Compose](https://docs.docker.com/compose/). [Traefik](https://doc.traefik.io/traefik/) is chosen as a reverse proxy server for its simplicity and great perfomance.

## Deployment
#### Local
1. `> git clone https://github.com/kanzitelli/parse-server-starter.git`
2. `> cd parse-server-starter`
3. `> mv example.env .env`
4. `> sh build-up.sh`
5. Open `http://localhost:6969/dashboard` and enter credentials from `.env` (default: `admin` for username and `12345` for password).

#### Production
`Coming soon...`

## Read it before use it
#### [Tutorial on Medium](https://kanzitelli.medium.com/rapid-backend-as-a-service-baas-for-web-mobile-apps-915427198f43)
#### Cloud functions
[Parse Platform](https://parseplatform.org/) gives us an ability to write and host [Cloud Functions](https://docs.parseplatform.org/cloudcode/guide/) on the same server with api and dashboard. You can define new functions in `server/cloud/main.js`. More information can be found [here](https://docs.parseplatform.org/cloudcode/guide/).

In order to have up-to-date running Cloud Functions (when you add a new one and don't want to rebuild whole Docker image), you just need to restart `parse-server` container. You can do it by running `> sh restart.sh`. Or just using Docker extension in VSCode or Docker Desktop app.

Cloud Functions update flow:
1. Open `server/cloud/main.js` and add simple `hello1` function:
```
Parse.Cloud.define('hello1', async req => {
  return 'hello1';
});
```
2. Open terminal and run `> sh restart.sh`
3. Check new function `> curl -X POST -H "X-Parse-Application-Id: APP_ID" -H "Content-Type: application/json" http://localhost:6969/parse/functions/hello1`

## Todos
- [ ] Production deployment tutorial (w/ https and [DO](https://digitalocean.com) DNS challenge)
- [ ] TypeScript support
- [ ] More options of env variables for Parse configuration
- [x] [Article](https://kanzitelli.medium.com/rapid-backend-as-a-service-baas-for-web-mobile-apps-915427198f43) with more detailed tutorial. 
- [x] Local deployment
- [x] Percona Server Mongodb support
- [x] Postgis (Postgres) support
- [x] Mongodb support (tested on a real project)