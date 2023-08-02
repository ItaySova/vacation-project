import express, { Request, Response, NextFunction } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import cyber from "../4-utils/cyber";
import followService from "../5-services/follow-service";

const router = express.Router();

router.post("/follower/:vacationId([0-9]+)", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = await cyber.decodeUser(request)
        const vacationId = +request.params.vacationId
        const addedFollower = await followService.addFollow(user.userId, vacationId)
        response.status(201).json(addedFollower)
    }
    catch (err: any) {
        next(err);
    }
});