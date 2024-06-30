import { Router } from 'express'
import { UserController } from './controllers/UserController'

const routes = Router()

routes.post('/signup', new UserController().signup)
routes.post('/signin', new UserController().signin)

export default routes