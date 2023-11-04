import { NextFunction, Response } from "express";
import { verifyAccessTokenJwt } from "../utils/jwt";
import CustomError from "../utils/errorHandler";
import { IReqAuth } from "../models/user";
import db from "../config/database";
import { IDecodedAccessToken } from "../models/token";

export const authenticatedUser = async (req: IReqAuth, res: Response, next: NextFunction) => {
    try {
        const { accessToken } = req.signedCookies;

        if (!accessToken) {
            return next(new CustomError("Invalid Credentials", 401, req.path));
        }

        const decoded = verifyAccessTokenJwt(accessToken) as IDecodedAccessToken;
        const user = await db('users').select('id', 'firstName', 'lastName', 'email').where('id', decoded.sub).first();

        if (!user) {
            return next(new CustomError("Invalid Credentials", 401, req.path));
        }

        req.user = user;
        next();
    } catch (error) {
        return next(new CustomError("Unauthenticated User", 401, req.path));
    }
};