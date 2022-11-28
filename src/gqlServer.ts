import { makeExecutableSchema } from "@graphql-tools/schema";
import { gql } from "graphql-tag";

import { ServiceLocator } from "./services/serviceLocator";
import {
    MutationCreateUserArgs,
    MutationSignInUserArgs,
    QueryFindUserByEmailArgs,
} from "./generated/graphql";
import { PlatformUserErrors } from "./services/user";
import { createGraphQLError } from "graphql-yoga";

const typeDefs = gql`
    # TODO: move this to a separate file?
    input UserCreationInput {
        email: String!
        password: String!
        username: String!
        displayName: String
    }

    input UserSignInInput {
        email: String!
        password: String!
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
        createUser(userInfo: UserCreationInput!): User!
        signInUser(userInfo: UserSignInInput!): User!
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
                const [newUser, error] =
                    await ServiceLocator.userService.createUser(userInfo);

                if (newUser) {
                    return newUser;
                }

                if (error === PlatformUserErrors.UserExists) {
                    return createGraphQLError("User already exists");
                }
            },
            async signInUser(_, { userInfo }: MutationSignInUserArgs) {
                const [user, error] =
                    await ServiceLocator.userService.signInUser(userInfo);

                if (user) {
                    return user;
                }

                if (error === PlatformUserErrors.UnknownError) {
                    return createGraphQLError("Something went wrong :(");
                }

                return createGraphQLError("Invalid email or password");
            },
        },
    },
});
