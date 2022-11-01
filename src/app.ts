import "reflect-metadata";
import express from "express";
import { Route } from "./routes/Users.routes";
import { loginUser_Controller } from "./controllers/loginUser.controller";
import { CodeError } from "./middlewares/CodeError";

const app = express();
app.use(express.json());

app.use("/users", Route);
app.post("/login", loginUser_Controller)

app.use(CodeError)
export default app;