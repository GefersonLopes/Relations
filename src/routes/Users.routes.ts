import { Router } from "express";

import { deleteUser_Controller } from "../controllers/deleteUser.controller";
import { listUser_Controller } from "../controllers/listUsers.controller";
import { registerUser_Controller } from "../controllers/registerUser.controller";
import { updateUser_Controller } from "../controllers/updateUser.controller";
import { verifyAdm } from "../middlewares/verifyAdm";
import { verifyNotAdm } from "../middlewares/verifyNotAdm";
import { verifyToken } from "../middlewares/Verifytoken";

export const Route = Router();

Route.post("/", registerUser_Controller);
Route.get("/", verifyToken, verifyAdm , listUser_Controller);
Route.patch("/:id", verifyToken , verifyNotAdm, updateUser_Controller);
Route.delete("/:id", verifyToken, verifyAdm, deleteUser_Controller);
