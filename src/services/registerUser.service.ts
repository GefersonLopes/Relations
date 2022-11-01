import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { IUserRequest } from "../interfaces/users";
import bcryptjs from "bcryptjs";
import { AppError } from "../Errors/appError";

export const registerUser_Services = async ({
    name,
    email,
    password,
    isAdm,
}: IUserRequest) => {
    try {
        const repository = AppDataSource.getRepository(User);
        const users = await repository.find();
        const verifyEmailExists = users.find((u) => u.email === email);
        const hashPassword = bcryptjs.hashSync(password, 10);
        if (verifyEmailExists) {
            throw new Error("User already exists");
        }

        const user = new User();
        user.name = name;
        user.email = email;
        user.password = hashPassword;
        user.isAdm = isAdm;

        repository.create(user);
        await repository.save(user);

        const result = {
            id: user.id,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            name: user.name,
            email: user.email,
            isAdm: user.isAdm,
            isActive: user.isActive,
        };
        return result;
    } catch (err) {
        if (err instanceof AppError) {
            throw new Error(err.message, 401);
        }
    }
};
