import { OkPacket } from "mysql2";
import { ResourceNotFoundError } from "../2-models/client-errors";
import UserModel from "../2-models/user-model";
import dal from "../4-utils/dal";



async function getAllUsers(): Promise<UserModel[]> {
    const sql = "SELECT * FROM users_table";
    const users = await dal.execute(sql);
    return users;

}

async function getOneUser(id:number): Promise<UserModel>  {
    const sql = "SELECT * from users_table where userId = ?";
    const user = await dal.execute(sql, [id]);
    return user;
}

async function deleteUser(id:number): Promise<void>  {
    const sql = `DELETE FROM users_table WHERE userId = ?`;
    const result: OkPacket = await dal.execute(sql, [id]);
    // If not found:
    if (result.affectedRows === 0) throw new ResourceNotFoundError(id);
}


export default {
    getAllUsers,
    getOneUser,
    deleteUser
};