import UserModel from "../2-models/user-model";
import { ResourceNotFoundError, ValidationError } from "../2-models/client-errors";
import VacationModel from "../2-models/vacation-model";
import imageHandler from "../4-utils/image-handler";
import dal from "../4-utils/dal";
import { OkPacket } from "mysql";
import appConfig from "../4-utils/app-config";

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
async function getVacations(userId: number, options?: { page?: number, showFollowed?: boolean, showFuture?: boolean, showActive?: boolean }): Promise<{ vacations: VacationModel[], numOfPages: number }> {
    let condition = ``
    if (options.showFollowed) {
        condition += `HAVING isFollowing=1`
    }
    if (options.showFuture) {
        condition += `HAVING startDate > CURRENT_DATE()`
    }
    if (options.showActive) {
        condition += `HAVING startDate <= CURRENT_DATE() AND endDate >= CURRENT_DATE()`
    }
    // remove at final edit
    let sql = `
        SELECT DISTINCT
            V.*,
            EXISTS(SELECT * FROM followers_table WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
            COUNT(F.userId) AS followersCount
        FROM vacation_table as V LEFT JOIN followers_table as F
        ON V.vacationId = F.vacationId
        GROUP BY vacationId
        ${condition}
        ORDER BY startDate
        `;

    let sql2 = `
        SELECT DISTINCT
            V.vacationId,
            V.destination,
            V.description,
            V.startDate,
            V.endDate,
            V.price,
            CONCAT('${appConfig.imagesUrl}', V.pictureName) AS pictureName,
            EXISTS(SELECT * FROM followers_table WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
            COUNT(F.userId) AS followersCount
        FROM vacation_table as V LEFT JOIN followers_table as F
        ON V.vacationId = F.vacationId
        GROUP BY vacationId
        ${condition}
        ORDER BY startDate
        `;


    if (options?.page) {
        sql += `
            LIMIT 9
            OFFSET ${(options.page - 1) * 9}
        `;
        sql2 += `
            LIMIT 9
            OFFSET ${(options.page - 1) * 9}
        `;
    }
    let vacations = await dal.execute(sql2, [userId]);

    const numOfPagesQuery = `SELECT COUNT(vacationId) AS numOfVacations FROM vacation_table`;
    const numOfPagesRes = await dal.execute(numOfPagesQuery)
    const numOfPages = Math.ceil(numOfPagesRes[0].numOfVacations / 9)


    return {
        vacations,
        numOfPages,
    };
}

async function getSingleVacation(id: number): Promise<VacationModel> {
    const sql = `SELECT * FROM vacation_table WHERE vacationId = ${id}`
    const sql2 = `SELECT vacationId,
    destination,
    description,
    startDate,
    endDate,
    price,
    CONCAT('${appConfig.imagesUrl}', pictureName) AS pictureName
    FROM vacation_table WHERE vacationId = ${id}`
    //appConfig.imagesUrl
    const vacations = await dal.execute(sql2);
    const vacation = vacations[0];
    if (!vacation) throw new ResourceNotFoundError(id);
    return vacation;
}

async function addVacation(vacation: VacationModel): Promise<VacationModel> {
    delete vacation.vacationId
    // validations
    const errors = vacation.validatePost();
    if (errors) throw new ValidationError(errors);

    let imageName = null;

    // If we have image:
    if (vacation.image) {

        // Save image: 
        imageName = await imageHandler.saveImage(vacation.image);

        // Set back image url: 
        vacation.pictureName = appConfig.imagesUrl + imageName;
    }

    console.log(vacation.description)
    const sql = `INSERT INTO vacation_table(destination,description,startDate,endDate,price,pictureName)
    VALUES (?, ?, ?, ?, ?, ?)`
    const result: OkPacket = await dal.execute(sql, [vacation.destination,vacation.description,vacation.startDate,vacation.endDate,vacation.price,imageName]);
    vacation.vacationId = result.insertId

    delete vacation.image;

    return vacation;
}

async function editVacation(vacation: VacationModel): Promise<VacationModel> {

    // Take original image name: 
    let imageName = await getVacationPictureName(vacation.vacationId);

    // If we have an image to update:
    if (vacation.image) {
        // Update image:
        imageName = await imageHandler.updateImage(vacation.image, imageName);
    }

    // Set back image url: 
    vacation.pictureName = appConfig.imagesUrl + imageName;

    const errors = vacation.validatePut();
    if (errors) throw new ValidationError(errors);
    const sql = `UPDATE vacation_table SET
    destination =?,
    description =?,
    startDate =?,
    endDate =?,
    price =?,
    pictureName =?
    WHERE vacationId = '${vacation.vacationId}'`

    const result: OkPacket = await dal.execute(sql,[vacation.destination,vacation.description,vacation.startDate,vacation.endDate,vacation.price,imageName]);

    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

    // Remove image file from returned product:
    delete vacation.image;

    return vacation;
}


async function deleteVacation(id: number): Promise<void> {

    // Take original image name: 
    let imageName = await getVacationPictureName(id);
    // Create query: 
    const sql = `DELETE FROM vacation_table WHERE vacationId = ${id}`;

    // Execute: 
    const result: OkPacket = await dal.execute(sql);

    // If product not found:
    if (result.affectedRows === 0) throw new ResourceNotFoundError(id);

    // Delete image from disk:
    await imageHandler.deleteImage(imageName);

}


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

// Get product image name from db:
async function getVacationPictureName(id: number): Promise<string> {

    // Create query: 
    const sql = `SELECT pictureName FROM vacation_table WHERE vacationId = ${id}`;

    // Get products: 
    const vacations = await dal.execute(sql);

    // Extract first product: 
    const vacation = vacations[0];

    // If id not found: 
    if (!vacation) return null;

    // Get image name: 
    const imageName = vacation.pictureName;

    // Return: 
    return imageName;
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
    deleteFollow,
    deleteVacationsFollows
};

