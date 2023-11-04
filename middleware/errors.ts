import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/errorHandler";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandling = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode).json({
    message: err.message || "Internal Server Error",
    status: err.statusCode || 500,
    stackTrace: err.stack,
    timestamp: err.timestamp,
    path: err.path
  })
};

export default errorHandling

