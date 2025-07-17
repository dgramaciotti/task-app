# Task server

## Get started

1. Install docker
2. docker compose up
3. API should be listening on localhost port 3000

## Seed

By default the DB url is set for the NODE application context inside the container. This means the connection URL references the docker network, so if you want to run the seed script in the machine network context, you'll have to change the DB url host from `db` to `localhost`:

DATABASE_URL="postgresql://your_user:your_password@localhost:5432/node_db?schema=public"

## Logs

This app also include a very basic grafana logging stack, which captures docker default logs. Can be accessed at localhost:3001.
