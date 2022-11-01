import { NextFunction, Request, response, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyNotAdm = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    const { id } = req.params;
    if (!token) {
        return res.status(403).json({message: "not authorized"});
    }
    token = token.split(" ")[1];

    jwt.verify(
        token,
        process.env.SECRET_KEY as string,
        (err: any, decoded: any) => {
            if (err) {
                return res.status(401).json({message: err.message});
            }

            if(decoded.id !== id && !decoded.isAdm){
                return res.status(401).json({message: "User not is admin"});
            }

            next();
        }
    );
};