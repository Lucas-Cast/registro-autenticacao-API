import { Router } from "express";
import { UserController } from "./controllers/UserController";
import cors from "cors";

const routes = Router();
routes.use(cors());
routes.post("/signup", new UserController().signup);
routes.post("/signin", new UserController().signin);
routes.delete("/deleteUser", new UserController().delete);

export default routes;
