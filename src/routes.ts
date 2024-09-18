import { Router } from "express";
import { server } from "./controllers/Server";
import Controller from "./controllers/Controller";


const routes = Router()

const controller = new Controller()

routes.get('/', server)
routes.get('/target1', controller.somar)

export default routes