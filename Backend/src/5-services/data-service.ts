import UserModel from "../2-models/user-model";
import VacationModel from "../2-models/vacation-model";
import dal from "../4-utils/dal";
import { OkPacket } from "mysql";

async function getAllVacations(): Promise<VacationModel[]> {
    const sql = "SELECT * FROM vacation_table";
    const vacations = await dal.execute(sql);
    return vacations;

}

async function getAllUsers(): Promise<UserModel[]> {
    const sql = "SELECT * FROM users_table";
    const users = await dal.execute(sql);
    return users;

}
 // will be used later with authentication
async function getVacations(userId: number): Promise<VacationModel[]> {
    const sql = `
        SELECT DISTINCT
            V.*,
            EXISTS(SELECT * FROM followers_table WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
            COUNT(F.userId) AS followersCount
        FROM vacation_table as V LEFT JOIN followers_table as F
        ON V.vacationId = F.vacationId
        GROUP BY vacationId
        ORDER BY startDate
        `;
    
    const vacations = await dal.execute(sql, [userId]);

    return vacations;
}

export default {
    getAllVacations,
    getAllUsers,
    getVacations
};

