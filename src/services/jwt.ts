import jwt from "jsonwebtoken";

export class JWTService {
    private readonly jwtSecret: string;

    constructor() {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET not set");
        }
        this.jwtSecret = process.env.JWT_SECRET!;
    }

    sign(payload: any) {
        return jwt.sign(payload, this.jwtSecret);
    }

    verify(token: string) {
        return jwt.verify(token, this.jwtSecret);
    }
}
