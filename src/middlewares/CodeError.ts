import { NextFunction, Request, Response } from "express";
import { AppError } from "../Errors/appError";

export const CodeError = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(err.status).json(err.message);
    }
    return res.status(500).json("internal error!");
};
