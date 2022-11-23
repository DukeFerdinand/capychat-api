import { UserService } from "./user";

export class ServiceLocator {
    public static userService = new UserService();
}
