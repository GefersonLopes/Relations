import { Request, Response } from "express";
import { listUser_Services } from "../services/listUsers.service";
import { instanceToPlain } from "class-transformer";

export const listUser_Controller = async (req: Request, res: Response) => {
    const result = await listUser_Services();
    return res.status(200).json(instanceToPlain(result));
};
