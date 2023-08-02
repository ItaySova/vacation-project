import express, { Request, Response, NextFunction } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import cyber from "../4-utils/cyber";
import followService from "../5-services/follow-service";

const router = express.Router();