# hybr1d-assessment

The project is built on

- Nodejs
- Prisma
- Postgres
- Express

Code Structure

    - src
        - /config - Constains all the logic related to configuring of third party components
        - /contrllers - Defines all the routes and routes the requests to the request handler services
        - /helpers- Contains of all the logic which can be abstracted away from a request handler
        - /interfaces - Contains typescript interfaces
        - /middlewares - contains all the middleware function which run before and after the request
        - /repositories- Contains all the database queries
        - /services - Contains all the request handler functions
        - /types - Contains typescript types
        - /utility - Contains malicious logic
        - .router - Imports all the controllers
        - .server - Responsible for setting up a express server and configuring all the routes and middlewares.

How to run project?

1. Clone the repository - $ git clone git@github.com:lakshya187/hybr1d-assessment.git
2. Install the dependencies - $ npm i
3. run locally -$ npm run dev
4. build - $ npm run build
5. run on production - $ npm run start

\*Note - api_postman_collection.json contains all the apis endpoints
