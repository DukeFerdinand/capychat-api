import { PrismaClient, User } from "@prisma/client";
import { getPrismaClient } from "../db/client";
import { validatePhoneNumber } from "../utils/phone";
import { UserCreationInput } from "../generated/graphql";
import { hashPassword } from "../utils/passwords";

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

    async createUser(userInput: UserCreationInput) {
        return await this.dbClient.user.create({
            data: {
                ...userInput,
                email: userInput.email.toLowerCase(),
                password: hashPassword(userInput.password),
                displayName: userInput.displayName || userInput.username,
            },
        });
    }
}
