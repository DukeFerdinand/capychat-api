import { PrismaClient, User } from "@prisma/client";
import { getPrismaClient } from "../db/client";
import { validatePhoneNumber } from "../utils/phone";
import { UserCreationInput, UserSignInInput } from "../generated/graphql";
import { comparePassword, hashPassword } from "../utils/passwords";
import { NullResponseTuple } from "../types/responses";

export enum PlatformUserErrors {
    UnknownError,
    UserExists,
    UserNotFound,
    BadCredentials,
}

export class UserService {
    private dbClient: PrismaClient;
    constructor() {
        this.dbClient = getPrismaClient();
    }
    static validatePhoneNumber(phone: string): boolean {
        return validatePhoneNumber(phone);
    }

    // Getters

    async findByEmail(email: string): Promise<User | null> {
        return await this.dbClient.user.findUnique({
            where: {
                email,
            },
        });
    }

    // Setters

    async createUser(
        userInput: UserCreationInput
    ): Promise<NullResponseTuple<User, PlatformUserErrors>> {
        try {
            const user = await this.dbClient.user.create({
                data: {
                    ...userInput,
                    email: userInput.email.toLowerCase(),
                    password: hashPassword(userInput.password),
                    displayName: userInput.displayName || userInput.username,
                },
            });

            return [user, null];
        } catch (e) {
            if (e instanceof Error) {
                if (e.message.includes("User_email_key")) {
                    return [null, PlatformUserErrors.UserExists];
                }
            }
            return [null, PlatformUserErrors.UnknownError];
        }
    }

    async signInUser(
        userInput: UserSignInInput
    ): Promise<NullResponseTuple<User, PlatformUserErrors>> {
        try {
            const user = await this.dbClient.user.findUnique({
                where: {
                    email: userInput.email,
                },
            });

            if (!user) {
                return [null, PlatformUserErrors.UserNotFound];
            }

            // This one _probably_ won't be surfaced, but it's here
            if (user && !comparePassword(userInput.password, user.password)) {
                return [null, PlatformUserErrors.BadCredentials];
            }

            // TODO: Attach a JWT token here
            let userWithoutPass = user;
            // @ts-ignore
            delete userWithoutPass.password;

            return [userWithoutPass, null];
        } catch (e) {
            console.error(e);
            return [null, PlatformUserErrors.UnknownError];
        }
    }
}
