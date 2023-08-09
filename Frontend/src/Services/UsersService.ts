import UserModel from "../Models/UserModel";
import axios from "axios";
import appConfig from "../Utils/AppConfig";


class UserService {
    public async getAllUsers():Promise<UserModel[]> {
        const response = await axios.get<UserModel[]>(appConfig.userUrl);
        let users = response.data;
        return users;
    }
}



const userService = new UserService();

export default userService;
