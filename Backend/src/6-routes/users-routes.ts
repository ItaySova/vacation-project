import express, { Request, Response, NextFunction } from "express";
import usersService from "../5-services/users-service";

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

export default router;