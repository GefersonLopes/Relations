import { Request, Response } from "express";
import { loginUser_Services } from "../services/loginUser.service";

export const loginUser_Controller = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await loginUser_Services({ email, password });
    return res.status(200).json(result);
};
