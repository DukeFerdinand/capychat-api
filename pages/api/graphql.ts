import { createYoga } from "graphql-yoga";
import { NextApiRequest, NextApiResponse } from "next";
import { schema } from "../../src/gqlServer";

export const config = {
    api: {
        // Disable body parsing (required for file uploads)
        bodyParser: false,
    },
};

export default createYoga<{
    req: NextApiRequest;
    res: NextApiResponse;
}>({
    // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
    graphqlEndpoint: "/api/graphql",
    schema,
    graphiql: process.env.NODE_ENV === "development",
});
