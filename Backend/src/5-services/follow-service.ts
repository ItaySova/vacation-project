import dal from "../4-utils/dal";
import { OkPacket } from "mysql";


async function addFollow(userId: number, vacationId: number): Promise<number[]> {
    const sql = `INSERT INTO followers_table VALUES(${userId},${vacationId})`;
    const result: OkPacket = await dal.execute(sql);
    // return result.affectedRows;
    return [
        userId,
        vacationId
    ];
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
    //add
}

export default {
    addFollow,
    deleteFollow,
    deleteVacationsFollows,
    deleteUsersFollow,
    resetFollowerTable
};