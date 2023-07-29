import UserModel from "../2-models/user-model";
import dal from "../4-utils/dal";



async function getAllUsers(): Promise<UserModel[]> {
    const sql = "SELECT * FROM users_table";
    const users = await dal.execute(sql);
    return users;

}


export default {
    getAllUsers
};