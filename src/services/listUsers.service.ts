import AppDataSource from "../data-source";
import { AppError } from "../Errors/appError";
import { User } from "../entities/user.entity";

export const listUser_Services = async () => {
    try {
        const repository = AppDataSource.getRepository(User);
        const users = await repository.find();
        return users;
    } catch (err) {
        if (err instanceof AppError) {
            throw new Error(err.message, 401);
        }
    }
};
