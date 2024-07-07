import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const user = AppDataSource.getRepository(User)

export class UserRepository {
    async signup (name: string, email:string, password:string) {

        try {
            const newUser = user.create({
                name,
                email,
                password
            })
            await user.save(newUser)

        } catch (err) {
            throw err
        }
    }
    
    async findUserByEmail(email: string) {
        try {
            return await user.findOneBy({ email })
        } catch (err) {
            throw err
        }
    }

    async findUserById(id: number) {
        try {
            return await user.findOneBy({ id })
        }catch(err) {
            throw err
        }
    }

    async deleteUser(id: number) {
        try {
            return await user.delete(id)
        }catch(err) {
            throw err
        }
    }
}