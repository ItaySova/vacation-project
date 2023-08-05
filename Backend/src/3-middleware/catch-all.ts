import { NextFunction, Request, Response } from "express";
import logger from "../4-utils/log-helper";

function catchAll(err: any, request: Request, response: Response, next: NextFunction) {
    
    // Display error: 
    console.log(err);

    logger.error(err.message)

    // Find status code: 
    const statusCode = err.status || 500; // Short Circuit

    // Send back error details to frontend:
    response.status(statusCode).send(err.message);
}

export default catchAll;
