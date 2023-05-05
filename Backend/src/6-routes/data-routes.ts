import express, { Request, Response, NextFunction } from "express";
import dataService from "../5-services/data-service";
import VacationModel from "../2-models/vacation-model";
import FollowerModel from "../2-models/follower-model";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import cyber from "../4-utils/cyber";
import verifyAdmin from "../3-middleware/verify-admin";

// todo - update the permissions

const router = express.Router();

// router.get("/vacations", async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const vacations = await dataService.getAllVacations()
//         response.json(vacations)
//     }
//     catch(err: any) {
//         next(err);
//     }
// });

// get all the vacations for a single user
router.get("/vacations", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = await cyber.decodeUser(request)
        const vacations = await dataService.getVacations(user.userId)
        response.json(vacations)
    }
    catch(err: any) {
        next(err);
    }
});
 // get a single vacation
router.get("/vacations/:id([0-9]+)", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.id
        const vacations = await dataService.getSingleVacation(vacationId)
        response.json(vacations)
    }
    catch(err: any) {
        next(err);
    }
});


router.get("/vacations-report", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await dataService.getVacationsReport()
        response.json(vacations)
    }
    catch(err: any) {
        next(err);
    }
});

router.post("/vacations", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacation = new VacationModel(request.body)
        const addedVacation = await dataService.addVacation(vacation)
        response.status(201).json(addedVacation)
    }
    catch(err: any) {
        next(err);
    }
});

// edit
router.put("/vacations/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.vacationId = +request.params.id
        const vacation = new VacationModel(request.body)
        const updatedVacation = await dataService.editVacation(vacation)
        response.json(updatedVacation)
    }
    catch(err: any) {
        next(err);
    }
});

router.delete("/vacations/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await dataService.deleteVacation(id)
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});


router.post("/follower", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const follower = new FollowerModel(request.body)
        const addedFollower = await dataService.addFollow(follower)
        response.status(201).json(addedFollower)
    }
    catch(err: any) {
        next(err);
    }
});


router.delete("/follower/:userId([0-9]+)/:vacationId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId
        const vacationId = +request.params.vacationId
        await dataService.deleteFollow(userId, vacationId)
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/users", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const users = await dataService.getAllUsers()
        response.json(users)
    }
    catch(err: any) {
        next(err);
    }
});

export default router;
