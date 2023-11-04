import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/errorHandler";
import { ILogin, IUserRequest } from "../models/user";

export const validRegistration = async (req: Request<IUserRequest>, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password } = req.body 
    if (!firstName || !lastName || !email || !password) {
        return next(new CustomError("Please provide all values", 400, req.path))
    }
    if (!isValidEmail(email)) { 
        return next(new CustomError("Please provide a valid email", 400, req.path)) 
    }
    if (!isValidPassword(password)) {
        return next(new CustomError("Password must be between 8-20 characters", 400, req.path));
    }
    next()
}

export const validLogin = async (req: Request<ILogin>, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new CustomError("Please provide all values", 400, req.path))
    }
    if (!isValidEmail(email)) {
        return next(new CustomError("Please provide a valid email", 400, req.path)) 
    }
    if (!isValidPassword(password)) {
        return next(new CustomError("Password must be between 8-20 characters", 400, req.path)) 
    }
    next()
}


export const isValidEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const isValidPassword = (password: string) => {
    const passwordLength = password.length;
    return passwordLength >= 8 && passwordLength <= 20;
}