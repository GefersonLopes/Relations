import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { IUserLogin } from "../interfaces/users";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AppError } from "../Errors/appError";

export const loginUser_Services = async ({ email, password }: IUserLogin) => {
    try {
        const repository = AppDataSource.getRepository(User);
        const users = await repository.find();
        const user = users.find((user) => user.email === email);
        if (!user) {
            throw new Error("Wrong email/password");
        }
        if (!bcrypt.compareSync(password, user.password)) {
            throw new Error("Wrong email/password");
        }
        const token = jwt.sign(
            {
                email: email,
                id: user.id,
                isAdm: user.isAdm,
            },
            String(process.env.SECRET_KEY),
            { expiresIn: "1d" }
        );

        return { token };
    } catch (err) {
        if (err instanceof AppError) {
            throw new Error(err.message, 401);
        }
    }
};
