import { Router } from 'express'
import { UserController } from './controllers/UserController'

const routes = Router()

routes.use('/signup', new UserController().signup)

export default routes