import { NextFunction, Request, Response } from "express";
import logger from "../4-utils/log-helper";

async function logRequests(request: Request, response: Response, next: NextFunction) {

    const msg = `${request.method} Request to ${request.originalUrl}`;

    logger.info(msg);

    next();

}

export default logRequests;