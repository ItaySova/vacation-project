import { OkPacket } from "mysql";
import { UnauthorizedError, ValidationError } from "../2-models/client-errors";
import CredentialsModel from "../2-models/credentials-model";
import RoleModel from "../2-models/role-model";
import UserModel from "../2-models/user-model";
import cyber from "../4-utils/cyber";
import dal from "../4-utils/dal";

// Register new user: 
async function register(user: UserModel): Promise<string> {

    //Joi Validation...
    const errors = user.validateRegister();
    if (errors) throw new ValidationError(errors);

    // Is username taken:
    const isTaken = await isUsernameTaken(user.firstName, user.lastName);
    if(isTaken) throw new ValidationError(`the user ${user.firstName} ${user.lastName} already exist`);

    // email validation 
    const emailTaken = await isEmailTaken(user.email);
    if(emailTaken) throw new ValidationError(`the email ${user.email} is taken`);
    // Set role as a regular user:
    user.roleId = RoleModel.User;

    // hash the password
    user.password = cyber.hashPassword(user.password)

    // Create query:
    const sql = `INSERT INTO users_table VALUES(
        DEFAULT,
        '${user.firstName}',
        '${user.lastName}',
        '${user.email}',
        '${user.password}',
        ${user.roleId})`;
    
    // Execute: 
    const result: OkPacket = await dal.execute(sql);

    // Set back auto-increment id:
    user.userId = result.insertId;

    // Create token:
    const token = cyber.createToken(user);

    // Return token:
    return token;
}

/**
 * 
 * @param username Username to check
 * @returns Return true if username taken
 */
async function isUsernameTaken(firstName: string, lastName: string): Promise<boolean> {

    // Create query:
    const sql = `SELECT EXISTS(SELECT * FROM users_table WHERE firstName = '${firstName}' AND lastName='${lastName}') AS isTaken`;

    // Execute: 
    const arr = await dal.execute(sql);

    // Get is taken value:
    const isTaken: number = arr[0].isTaken;

    // Return true if username taken:
    return isTaken === 1;
}

/**
 * 
 * @param email email to check
 * @returns Return true if email taken
 */
async function isEmailTaken(email:string): Promise<boolean> {
    const sql = `SELECT EXISTS(SELECT * FROM users_table WHERE email = '${email}') AS isTaken`;
    const arr = await dal.execute(sql);
    const isTaken: number = arr[0].isTaken;
    return isTaken === 1;
}

// Login:
async function login(credentials: CredentialsModel): Promise<string> {

    // TODO: Joi Validation...
    const errors = credentials.validateLogin();
    if (errors) throw new ValidationError(errors);

    // hash the password
    credentials.password = cyber.hashPassword(credentials.password)
    // Query:
    const sql = `SELECT * FROM users_table WHERE
        email = '${credentials.email}' AND
        password = '${credentials.password}'`;

    // Execute:
    const users = await dal.execute(sql);

    // Extract user:
    const user = users[0];

    // If user not exist:
    if(!user) throw new UnauthorizedError("Incorrect username or password");

    // Create token:
    const token = cyber.createToken(user);

    // Return token:
    return token;
}

export default {
    register,
    login
};
