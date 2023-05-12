import UserModel from "../2-models/user-model";
import { ResourceNotFoundError, ValidationError } from "../2-models/client-errors";
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
async function getVacations(userId: number, options?: { page?: number, showFollowed?: boolean, showFuture?:boolean, showActive?:boolean }): Promise<{ vacations: VacationModel[], numOfPages: number }> {
    let condition = ``
    if (options.showFollowed){
        condition += `HAVING isFollowing=1`
    }
    if (options.showFuture){
        condition += `HAVING startDate > CURRENT_DATE()`
    }
    if (options.showActive){
        condition += `HAVING startDate <= CURRENT_DATE() AND endDate >= CURRENT_DATE()`
    }
    let sql = `
        SELECT DISTINCT
            V.*,
            EXISTS(SELECT * FROM followers_table WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
            COUNT(F.userId) AS followersCount
        FROM vacation_table as V LEFT JOIN followers_table as F
        ON V.vacationId = F.vacationId
        GROUP BY vacationId
        ${condition}
        ORDER BY vacationId
        `;


    if (options?.page) {
        sql += `
            LIMIT 10
            OFFSET ${(options.page - 1) * 10}
        `;
    }
    let vacations = await dal.execute(sql, [userId]);

    // if (options.showFollowed) {
    //     vacations = vacations.filter((vacation: VacationModel) => vacation.isFollowing); // add to the model the is followed
    // }

    // if (options.showFuture){
    //     const currentDate = new Date().getTime()
    //     vacations = vacations.filter((vacation: VacationModel) => vacation.startDate.getTime() > currentDate)
    // }
    
    // if (options.showActive){
    //     const currentDate = new Date().getTime()
    //     vacations = vacations.filter((vacation: VacationModel) => vacation.startDate.getTime() < currentDate && vacation.endDate.getTime() > currentDate)
    // }// ADD ANOTHER CONDITION 

    const numOfPagesQuery =`SELECT COUNT(vacationId) AS numOfVacations FROM vacation_table`;
    const numOfPagesRes = await dal.execute(numOfPagesQuery)
    const numOfPages = Math.ceil(numOfPagesRes[0].numOfVacations / 10)


    return {
        vacations,
        numOfPages,
    };
}

async function getSingleVacation(id: number): Promise<VacationModel> {
    const sql = `SELECT * FROM vacation_table WHERE vacationId = ${id}`
    const vacations = await dal.execute(sql);
    const vacation = vacations[0];
    if (!vacation) throw new ResourceNotFoundError(id);
    return vacation;
}

async function addVacation(vacation: VacationModel): Promise<VacationModel> {
    // validations
    const errors = vacation.validatePost();
    if (errors) throw new ValidationError(errors);

    const sql = `INSERT INTO vacation_table(destination,description,startDate,endDate,price,pictureName)
    VALUES ('${vacation.destination}', '${vacation.description}',
            '${vacation.startDate}', '${vacation.endDate}', '${vacation.price}', '${vacation.pictureName}')`
    const result: OkPacket = await dal.execute(sql);
    vacation.vacationId = result.insertId
    return vacation;
}

async function editVacation(vacation: VacationModel): Promise<VacationModel> {
    const errors = vacation.validatePut();
    if (errors) throw new ValidationError(errors);
    const sql = `UPDATE vacation_table SET
    destination ='${vacation.destination}',
    description ='${vacation.description}',
    startDate ='${vacation.startDate}',
    endDate ='${vacation.endDate}',
    price ='${vacation.price}',
    pictureName ='${vacation.pictureName}'
    WHERE vacationId = '${vacation.vacationId}'`

    const result: OkPacket = await dal.execute(sql);

    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

    return vacation;
}


async function deleteVacation(id: number): Promise<void> {

    // Create query: 
    const sql = `DELETE FROM vacation_table WHERE vacationId = ${id}`;

    // Execute: 
    const result: OkPacket = await dal.execute(sql);

    // If product not found:
    if (result.affectedRows === 0) throw new ResourceNotFoundError(id);


}


async function addFollow(userId: number, vacationId: number): Promise<number> {
    const sql = `INSERT INTO followers_table VALUES(${userId},${vacationId})`;
    const result: OkPacket = await dal.execute(sql);
    return result.affectedRows;
}


async function deleteFollow(userId: number, vacationId: number): Promise<void> {
    const sql = `DELETE FROM followers_table WHERE userId=${userId} AND vacationId=${vacationId}`;
    const result: OkPacket = await dal.execute(sql);
}

async function getVacationsReport(): Promise<VacationModel[]> {
    const sql = `
        SELECT DISTINCT
            V.destination,
            COUNT(F.userId) AS followersCount
        FROM vacation_table as V LEFT JOIN followers_table as F
        ON V.vacationId = F.vacationId
        GROUP BY destination
        ORDER BY followersCount DESC
        `;

    const vacations = await dal.execute(sql);

    return vacations;
}

export default {
    getAllVacations,
    getAllUsers,
    getVacations,
    getSingleVacation,
    getVacationsReport,
    addVacation,
    editVacation,
    deleteVacation,
    addFollow,
    deleteFollow
};

