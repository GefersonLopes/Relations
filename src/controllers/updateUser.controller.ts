import { Request, Response } from "express";
import { updateUser_Services } from "../services/updateUser.service";

export const updateUser_Controller = async (req: Request, res: Response) => {
    const { name, email, password, isActive, isAdm, id } = req.body;
    const uuid = req.params.id;

    const result = await updateUser_Services(
        { name, email, password, isAdm, isActive, id },
        uuid
    );

    return res.status(200).json(result);
};
