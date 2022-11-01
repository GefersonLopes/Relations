import { Request, Response } from "express";
import { deleteUser_Services } from "../services/deleteUser.service";

export const deleteUser_Controller = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await deleteUser_Services(id);
    return res.status(204).json(result);
};
