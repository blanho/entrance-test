import { Request } from "express";

export interface IUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface IUserResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    hash: string;
    updatedAt: Date;
    createdAt: Date;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IReqAuth extends Request {
    user?: IUserResponse
}

