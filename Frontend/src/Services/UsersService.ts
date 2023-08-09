import UserModel from "../Models/UserModel";
import axios from "axios";
import appConfig from "../Utils/AppConfig";


class UserSevice {
    public async getAllUsers():Promise<UserModel[]> {
        const response = await axios.get<UserModel[]>(appConfig.userUrl);
        let users = response.data;
        return users;
    }
}



const dataService = new UserSevice();

export default dataService;
