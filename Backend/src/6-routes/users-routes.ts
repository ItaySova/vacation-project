import express, { Request, Response, NextFunction } from "express";
import usersService from "../5-services/users-service";
import UserModel from "../2-models/user-model";

const router = express.Router();

router.get("/users", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const users = await usersService.getAllUsers()
        response.json(users)
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/users/:userId",  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId
        const users = await usersService.getOneUser(userId)
        response.json(users)
    }
    catch (err: any) {
        next(err);
    }
})

router.get("/users/email/:email",  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const email = request.params.email
        const user = await usersService.getUserByEmail(email)
        response.json(user)
    }
    catch (err: any) {
        next(err);
    }
})

router.put("/users/:userId",  async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.userId = +request.params.userId
        const user = new UserModel(request.body)
        const updatedUser = await usersService.editUser(user)
        response.json(updatedUser)
    }
    catch (err: any) {
        next(err);
    }
})

router.delete("/users/:userId",  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId
        await usersService.deleteUser(userId)
        response.sendStatus(204)
    }
    catch (err: any) {
        next(err);
    }
})

export default router;