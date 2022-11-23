## Capybara Chat - API

![](https://api.checklyhq.com/v1/badges/checks/06e6203a-13ba-40d2-b57e-21699144479a?style=flat&theme=default&responseTime=true)

---

This the is API and GraphQL provider for the [Capybara Chat](https://github.com/DukeFerdinand/capybara-chat) application. This service is built using:

- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [MongoDB](https://www.mongodb.com/)
- [Vercel Functions](https://vercel.com/docs/serverless-functions/introduction)

And of course, hosted on [Vercel](https://vercel.com/).

## Getting Started

While this is not really intended to be a public project, you can still use it as a reference for your own projects.
To get started, you'll need to have the following installed:

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) or just a hosted MongoDB instance like I do
- *A local clone of the [Capybara Chat](https://github.com/DukeFerdinand/capybara-chat) repository

*Semi-optional, but recommended so you can test the API with the client.


### Installation

1. Clone the repo
   ```sh
   git clone
    ```
2. Create a `.env` file in the root of the project and add the following:
   ```sh
   echo DATABASE_URL=<your-mongodb-uri> >> .env
   ```
3. Install NPM packages
    ```sh
    yarn install
    ```
4. Generate the Prisma client
    ```sh
    yarn prisma generate
    ```
5. Run the development server
    ```sh
    yarn dev
    ```

Now you can make requests to the GraphQL API at `http://localhost:3000/graphql` or the normal API at `http://localhost:3000/<whatever-route>`.
   
## Usage

This project is intended to be used with the [Capybara Chat](https://github.com/DukeFerdinand/capybara-chat) project.
You're more than welcome to create your own client of course, but you'll need to make sure you're hosting this API
somewhere as the production client is configured to use the non-public production API.

## Copyright

I'm intentionally NOT locking this behind a closed source license. Let me know what you build, and even consider hiring
me if you're a company looking for a developer. I'm a Freelancer who is always looking for new projects to work on.