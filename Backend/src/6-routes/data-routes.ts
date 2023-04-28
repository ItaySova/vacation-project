import express, { Request, Response, NextFunction } from "express";
import dataService from "../5-services/data-service";

const router = express.Router();

router.get("/vacations", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await dataService.getAllVacations()
        response.json(vacations)
    }
    catch(err: any) {
        next(err);
    }
});
 // will be used later with authentication
router.get("/vacations/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = + request.params.id
        const vacations = await dataService.getVacations(userId)
        response.json(vacations)
    }
    catch(err: any) {
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
