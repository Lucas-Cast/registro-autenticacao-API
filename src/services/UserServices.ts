import { UserRepository } from "../repositories/UserRepository"
import { hashSync } from 'bcrypt'

export class UserService {
    async signup(name: string, email: string, password: string) {
        try{
            if (!name) throw 'You must send a password'
            if (!email) throw 'You must send an email'
            if (!password) throw 'You must send a password'
            
            const userRepository = new UserRepository()
            const userExists = await userRepository.findUserByEmail(email)
            if (userExists) throw 'User already exists'

            const saltRounds = 10;
            const hashPassword = hashSync(password, saltRounds);

            await userRepository.signup(name, email, hashPassword)
        } catch(err) {
            throw err
        }
    }
}