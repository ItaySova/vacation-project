import { ValidationError } from "../2-models/client-errors";
import FollowerModel from "../2-models/follower-model";
import dal from "../4-utils/dal";
import { OkPacket } from "mysql";


async function addFollow(userId: number, vacationId: number): Promise<number[]> {
    const sql = `INSERT INTO followers_table VALUES(${userId},${vacationId})`;
    const result: OkPacket = await dal.execute(sql);
    return [
        userId,
        vacationId
    ];
}

async function addFollowFixed(follower: FollowerModel): Promise<FollowerModel> {
    const sqlValidation = `SELECT * FROM followers_table WHERE userId = ? and vacationId = ?`;
    const exist = await dal.execute(sqlValidation, [follower.userId, follower.vacationId]);
    if (exist.length > 1) throw new ValidationError(`resource exist`);
    const sql = `INSERT INTO followers_table VALUES(${follower.userId},${follower.vacationId})`;
    const result:OkPacket = await dal.execute(sql);
    return follower;
}

async function deleteFollow(userId: number, vacationId: number): Promise<void> {
    const sql = `DELETE FROM followers_table WHERE userId=${userId} AND vacationId=${vacationId}`;
    const result: OkPacket = await dal.execute(sql);
}

// in case of deleting a vacation - remove all its likes from the table
async function deleteVacationsFollows(vacationId: number): Promise<void> {
    const sql = `DELETE FROM followers_table WHERE vacationId=${vacationId}`;
    const result: OkPacket = await dal.execute(sql);
}

// in case the user is deleted its followers will be deleted too
async function deleteUsersFollow(userId:number): Promise<void>  {
    const sql = `DELETE FROM followers_table WHERE userId = ?`
    const result:OkPacket = await dal.execute(sql,[userId])
}

async function resetFollowerTable(): Promise<void> {
    const sql = `DELETE FROM followers_table`
    const result:OkPacket = await dal.execute(sql)
}

// function to remove follows between removed vacations or users
async function cleanFollowersTable(): Promise<void>{
    const sql = `DELETE FROM followers_table where followers_table.vacationId NOT IN (SELECT vacationId FROM vacation_table)`;
    const result:OkPacket = await dal.execute(sql)
}

export default {
    addFollow,
    addFollowFixed,
    deleteFollow,
    deleteVacationsFollows,
    deleteUsersFollow,
    resetFollowerTable,
    cleanFollowersTable
};