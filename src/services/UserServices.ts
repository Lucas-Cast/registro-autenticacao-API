import { UserRepository } from "../repositories/UserRepository"
import { hashSync, compareSync } from 'bcrypt'
import { TokenExpiredError, sign } from 'jsonwebtoken'
import { userInfo } from "os"
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

    async signin(email:string, password:string) {
        try{
            if (!email) throw 'You must send an email'
            if (!password) throw 'You must send a password'
            
            const userRepository = new UserRepository()
            const user = await userRepository.findUserByEmail(email)
            
            if (!user) throw 'Wrong email or password'

            const comparison = compareSync(password, user.password)
            if (!comparison) throw 'Wrong email or password'

            const token = sign({ id: user.id }, process.env.JWT_PASS ?? '', {
                expiresIn: '8h',
            })

            const {password:_, ...userSession } = user
            return {
                user: userSession,
                token
            }
        } catch(err) {
            throw err
        }
    }

    async delete(id: unknown){
        try{
            if (!id) throw 'The id is empty'

            const userRepository = new UserRepository()
            const user = await userRepository.findUserById(id as number)
            if (!user) throw 'No user found'

            await userRepository.deleteUser(id as number)

        }catch(err) {
            throw err
        }

    }
}