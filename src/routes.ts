import { Router } from "express";
import { server } from "./controllers/Server";
import QuestaoUmController from "./controllers/QuestaoUmController";
import QuestaoDoisController from "./controllers/QuestaoDoisController";




const routes = Router()

const questaoUmController = new QuestaoUmController()
const questaoDoisController = new QuestaoDoisController()


routes.get('/', server)
routes.get('/target1', questaoUmController.questaoUm)
routes.post('/target2', questaoDoisController.questaoDois)

export default routes