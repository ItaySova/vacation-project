import express, { Request, Response, NextFunction } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import cyber from "../4-utils/cyber";
import followService from "../5-services/follow-service";
import verifyAdmin from "../3-middleware/verify-admin";
import FollowerModel from "../2-models/follower-model";

const router = express.Router();

router.post("/follower/:vacationId([0-9]+)", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = await cyber.decodeUser(request)
        const vacationId = +request.params.vacationId
        const follower = new FollowerModel({"userId":user.userId, "vacationId":vacationId} as FollowerModel)
        // const addedFollower = await followService.addFollow(user.userId, vacationId)
        const addedFollower = await followService.addFollowFixed(follower)
        response.status(201).json(addedFollower)
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/follower/reset", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        await followService.resetFollowerTable()
        response.sendStatus(204)
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/follower/clear", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        await followService.cleanFollowersTable()
        response.sendStatus(204)
    }
    catch (err: any) {
        next(err);
    }
});


router.delete("/follower/:vacationId([0-9]+)", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = await cyber.decodeUser(request)
        const vacationId = +request.params.vacationId
        await followService.deleteFollow(user.userId, vacationId)
        response.sendStatus(204)
    }
    catch (err: any) {
        next(err);
    }
});

export default router;
