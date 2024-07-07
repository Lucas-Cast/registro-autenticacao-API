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
    async signin(req: Request, res: Response) {
        try{       
            const { email, password } = await req.body 
            new UserService().signin(email, password)
            .then(user => res.status(200).send(user))
            .catch(err => res.status(400).send(err))
        } catch (err) {
            res.status(400).send(err)
        }
    }
    async delete(req: Request, res: Response) {
        try {
            const { id } = req.query
            new UserService().delete(id)
            .then(() => res.status(200).send('User successfuly deleted'))
            .catch( err => res.status(400).send(err))

        } catch(err){
            res.status(400).send(err)
        }
    }
}