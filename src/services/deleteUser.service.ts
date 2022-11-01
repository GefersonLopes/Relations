import AppDataSource from "../data-source";
import { AppError } from "../Errors/appError";
import { User } from "../entities/user.entity";

export const deleteUser_Services = async (id: string) => {
    try {
        const repository = AppDataSource.getRepository(User);
        const users = await repository.find();
        const user = users.find((user) => {
            return user.id === id;
        });

        if (!user) {
            throw new Error("User not found");
        }
        if (!user?.isActive) {
            throw new Error("User is inactive!");
        }
        await repository.update(user!.id, { isActive: false });
    } catch (err) {
        if (err instanceof AppError) {
            throw new Error(err.message, 401);
        }
    }
};
