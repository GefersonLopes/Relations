import { Request, Response } from "express";
import { registerUser_Services } from "../services/registerUser.service";
import { instanceToPlain } from "class-transformer";

export const registerUser_Controller = async (req: Request, res: Response) => {
    const { name, email, password, isAdm } = req.body;
    const result = await registerUser_Services({
        name,
        email,
        password,
        isAdm,
    });
    return res.status(201).json(instanceToPlain(result));
};
