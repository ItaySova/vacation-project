import UserModel from "../2-models/user-model";
import jwt from "jsonwebtoken";
import { Request } from "express";
import { UnauthorizedError } from "../2-models/client-errors";
import RoleModel from "../2-models/role-model";

const secretKey = "The Amazing 4578-85 Students!";

// Create new token:
function createToken(user: UserModel): string {

    // Create container containing the user:
    const container = { user };

    // Create options:
    const options = { expiresIn: "3h" };

    // Create token: 
    const token = jwt.sign(container, secretKey, options);
 
    // Return: 
    return token;
}

// The token is in a header named authorization
// authorization: "Bearer the-token"
//                 01234567
async function verifyToken(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {

        // Extract header:
        const header = request.header("authorization"); // "Bearer the-token"

        // If no header:
        if (!header) {
            reject(new UnauthorizedError("Incorrect username or password"));
            return;
        }

        // Extract token:
        const token = header.substring(7);

        // If no token:
        if (!token) {
            reject(new UnauthorizedError("Incorrect username or password"));
            return;
        }

        // Verify:
        jwt.verify(token, secretKey, err => {

            if (err) {
                reject(new UnauthorizedError("Invalid token"));
                return;
            }

            // All is good:
            resolve(true);

        });

    });
}

async function verifyAdmin(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {

        // Extract header:
        const header = request.header("authorization"); // "Bearer the-token"

        // If no header:
        if (!header) {
            reject(new UnauthorizedError("Incorrect username or password"));
            return;
        }

        // Extract token:
        const token = header.substring(7);

        // If no token:
        if (!token) {
            reject(new UnauthorizedError("Incorrect username or password"));
            return;
        }

        // Verify:
        jwt.verify(token, secretKey, (err, container: { user: UserModel }) => {

            if (err) {
                reject(new UnauthorizedError("Invalid token"));
                return;
            }

            // Extract user from token:
            const user = container.user;

            // If user is not admin:
            if (user.roleId !== RoleModel.Admin) {
                console.log(`admin role: ${RoleModel.Admin} user role: ${user.roleId}`)
                reject(new UnauthorizedError("Access denied"));
                return;
            }

            // All is good:
            resolve(true);

        });

    });
}


async function decodeUser(request: Request): Promise<UserModel>{
    const header = request.header("authorization");
    const token = header.substring(7);
    const payload = jwt.decode(token)
    const user = (payload as any).user
    return user;
}

export default {
    createToken,
    verifyToken,
    verifyAdmin,
    decodeUser
};
