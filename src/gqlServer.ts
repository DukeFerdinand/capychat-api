import { makeExecutableSchema } from "@graphql-tools/schema";
import { gql } from "graphql-tag";

import { ServiceLocator } from "./services/serviceLocator";
import {
    MutationCreateUserArgs,
    QueryFindUserByEmailArgs,
} from "./generated/graphql";

const typeDefs = gql`
    # TODO: move this to a separate file?
    input UserCreationInput {
        email: String!
        password: String!
        username: String!
        displayName: String
    }

    type User {
        id: ID!
        email: String
        username: String!
        displayName: String!
    }

    type Query {
        hello: String

        # User queries
        findUserByEmail(email: String!): User
    }

    type Mutation {
        createUser(userInfo: UserCreationInput!): User
    }
`;

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers: {
        Query: {
            hello: () => "Hello world!",

            async findUserByEmail(
                _parent,
                { email }: QueryFindUserByEmailArgs
            ) {
                return ServiceLocator.userService.findByEmail(email);
            },
        },
        Mutation: {
            async createUser(_parent, { userInfo }: MutationCreateUserArgs) {
                return ServiceLocator.userService.createUser(userInfo);
            },
        },
    },
});
