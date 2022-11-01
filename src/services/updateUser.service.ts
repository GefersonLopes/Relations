import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { IUserUpdate } from "../interfaces/users";
import bcrypts from "bcryptjs";
import { AppError } from "../Errors/appError";

export const updateUser_Services = async (
    { name, email, password, isAdm, id, isActive }: IUserUpdate,
    uuid: string
) => {
    try {
        if (
            isAdm === false ||
            isAdm === true ||
            id === true ||
            id === false ||
            isActive === true ||
            isActive === false
        ) {
            throw new Error("proptiets not available");
        }
        let newPassword = null;
        let verifyUser = null;
        const repository = AppDataSource.getRepository(User);
        const users = await repository.find();

        const result = users.find((user) => user.id === uuid);
        const date = new Date() + "";

        if (password) {
            verifyUser = bcrypts.compareSync(password, result!.password);
            newPassword = bcrypts.hashSync(password, 10);
        }

        await repository.update(result!.id, {
            name: name ? name : result?.name,
            email: email ? email : result?.email,
            password: newPassword ? newPassword : result?.password,
            updatedAt: date.toString(),
        });
        if (verifyUser) {
            throw new Error("Inform a different password.");
        }

        const repository2 = AppDataSource.getRepository(User);
        const users2 = await repository2.find();
        const user = users2.find((user) => user.id === uuid);

        return [user];
    } catch (err) {
        if (err instanceof AppError) {
            throw new Error(err.message, 401);
        }
    }
};
