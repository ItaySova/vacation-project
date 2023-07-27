import express, { Request, Response, NextFunction } from "express";
import dataService from "../5-services/data-service";
import VacationModel from "../2-models/vacation-model";
import FollowerModel from "../2-models/follower-model";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import cyber from "../4-utils/cyber";
import verifyAdmin from "../3-middleware/verify-admin";
import imageHandler from "../4-utils/image-handler";


const router = express.Router();

// get all the vacations for a single user
router.get("/vacations", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = await cyber.decodeUser(request)
        console.log(request.query)
        const serviceRequest = await dataService.getVacations(user.userId, {
            page: Number(request.query.page),
            showFollowed: Boolean(request.query.showFollowed),
            showFuture: Boolean(request.query.showFuture),
            showActive:Boolean(request.query.showActive) // ADD HERE ANOTHER PARARM
        })
        const data = await serviceRequest;
        response.json(data)
    }
    catch (err: any) {
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
    catch (err: any) {
        next(err);
    }
});


router.get("/vacations-report", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await dataService.getVacationsReport()
        response.json(vacations)
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body)
        const addedVacation = await dataService.addVacation(vacation)
        response.status(201).json(addedVacation)
    }
    catch (err: any) {
        next(err);
    }
});

// edit
router.put("/vacations/:id([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        request.body.vacationId = +request.params.id
        const vacation = new VacationModel(request.body)
        const updatedVacation = await dataService.editVacation(vacation)
        response.json(updatedVacation)
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/vacations/:id([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await dataService.deleteVacation(id)
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});


router.post("/follower/:vacationId([0-9]+)", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = await cyber.decodeUser(request)
        const vacationId = +request.params.vacationId
        const addedFollower = await dataService.addFollow(user.userId, vacationId)
        response.status(201).json(addedFollower)
    }
    catch (err: any) {
        next(err);
    }
});


router.delete("/follower/:vacationId([0-9]+)", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = await cyber.decodeUser(request)
        const vacationId = +request.params.vacationId
        await dataService.deleteFollow(user.userId, vacationId)
        response.sendStatus(204)
    }
    catch (err: any) {
        next(err);
    }
});

// GET the image
router.get("/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const imagePath = imageHandler.getImagePath(imageName);
        response.sendFile(imagePath);
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
    catch (err: any) {
        next(err);
    }
});

export default router;
