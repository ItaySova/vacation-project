import { OkPacket } from "mysql2";
import { ResourceNotFoundError, ValidationError } from "../2-models/client-errors";
import UserModel from "../2-models/user-model";
import dal from "../4-utils/dal";
import { use } from "chai";



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

async function editUser(user:UserModel): Promise<UserModel>  {
    
    // validations
    const errors = user.validateEdit()
    if (errors) throw new ValidationError(errors);
    const sql = `UPDATE users_table SET
    firstName =?,
    lastName =?,
    email =?,
    password =?,
    roleId =?
    WHERE userId =?`
    const result: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.roleId, user.userId]);
    if (result.affectedRows === 0) throw new ResourceNotFoundError(user.userId);

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
    editUser,
    deleteUser
};