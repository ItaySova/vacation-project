import UserModel from "../Models/UserModel";
import axios from "axios";
import appConfig from "../Utils/AppConfig";


class UserService {
    public async getAllUsers():Promise<UserModel[]> {
        const response = await axios.get<UserModel[]>(appConfig.userUrl);
        let users = response.data;
        return users;
    }

    public async getOneUser(id: number): Promise<UserModel>{
        const response = await axios.get<UserModel>(appConfig.userUrl + id);
        let user = response.data;
        return user;
    }

    public async editUser(user:UserModel):Promise<void>{
        const response = await axios.put<UserModel>(appConfig.userUrl + user.userId, user);
        // update when implementing redux
    }

    public async deleteUser(userID:number):Promise<void>{
        const response = await axios.delete<UserModel>(appConfig.userUrl + userID);
        // update when implementing redux
    }
}



const userService = new UserService();

export default userService;
