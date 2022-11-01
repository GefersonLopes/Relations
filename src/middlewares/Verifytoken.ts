import { Request, Response, NextFunction, request } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({message: "not authorized"});
    }
    token = token.split(" ")[1];

    jwt.verify(
        token,
        process.env.SECRET_KEY as string,
        (err: any, decoded: any) => {
            if (err) {
                return res.status(401).json({message: err.message});
            }
            req.user = {
                isAdm: decoded.isAdm,
                id: decoded.id,
            };

            next();
        }
    );
};
