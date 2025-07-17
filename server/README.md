# Task server

## Get started


1. Install docker
2. docker compose up
3. npx prisma db pull
    3.1 alternatively, run npx prisma db seed to populate with some records
4. modify .env to use the docker container network endpoint
`DATABASE_URL="postgresql://your_user:your_password@db:5432/node_db?schema=public"`
OR 
run the app locally `npm run dev`
5. API should be listening on localhost port 3000

## Seed

By default the DB url is set for the NODE application context inside the container. This means the connection URL references the docker network, so if you want to run the seed script in the machine network context, you'll have to change the DB url host from `db` to `localhost`:

DATABASE_URL="postgresql://your_user:your_password@localhost:5432/node_db?schema=public"

## Logs

This app was based on a template that also include a very basic grafana logging stack, which captures docker default logs. Can be accessed at localhost:3001.
