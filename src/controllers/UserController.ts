import { Request, Response } from "express"
import { UserService } from "../services/UserServices"
    
export class UserController {
    
    async signup(req: Request, res: Response) {
        try{
            const {name, email, password} = await req.body
            
            new UserService().signup(name, email, password)
            .then(() => res.status(200).send('User successfuly saved'))
            .catch(err => res.status(400).send(err))

        } catch (err){
            res.status(400).send(err)
        }
    }
}