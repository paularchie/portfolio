## Portfolio App

# linking the common module

Before starting the frontend and backend servers, the common module has to be linked as it's not push to the npm repository yet.
In order to do it, follow the below steps:

- install all dependencies (in the client, common and server folders)
- navigate to the 'common' folder and run 'yarn link'
- navigate to the 'client' folder and run 'yarn link @portfolio/common'
- navigate to the 'server' folder and run 'yarn link @portfolio/common'

## Client

# installing dependencies

run 'npm install' or 'yarn'

# run storybook

run 'npm run sb' or 'yarn sb'

# Starting the server

run 'npm start' or 'yarn start'

# running unit tests in a browser

run 'npm run cy:ct' or 'yarn cy:ct'

# running unit tests in a headless mode

run 'npm run cy:ct-run' or 'yarn cy:ct-run'

## Server

# installing dependencies

run 'npm install' or 'yarn'

# starting the server

run 'npm start' or 'yarn start' and navigate to localhost:4000/graphql

# running Prisma Studio

run "yarn prisma:studio" and navigate to localhost:5555

# running integration tests

run 'npm test' or 'yarn test'

# seeding the database

run 'npm run db:seed' or 'yarn db seed'

## Common

# installing dependencies

run 'npm install' or 'yarn'

# generating common models and types

run 'npm run build' or 'yarn build'
