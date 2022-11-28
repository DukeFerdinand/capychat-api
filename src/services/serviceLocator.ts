import { UserService } from "./user";
import { JWTService } from "./jwt";

export class ServiceLocator {
    public static userService = new UserService();
    public static jwtService = new JWTService();
}
