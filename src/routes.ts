import { Router } from "express";
import { server } from "./controllers/Server";
import QuestaoUmController from "./controllers/QuestaoUmController";
import QuestaoDoisController from "./controllers/QuestaoDoisController";
import QuestaoTresController from "./controllers/QuestaoTresController";
import { QuestaoQuatroController } from "./controllers/QuestaoQuatroController";




const routes = Router()

const questaoUmController = new QuestaoUmController()
const questaoDoisController = new QuestaoDoisController()
const questaoTresController = new QuestaoTresController()
const questaoQuatroController = new QuestaoQuatroController()

routes.get('/', server)
routes.get('/target1', questaoUmController.questaoUm)
routes.post('/target2', questaoDoisController.questaoDois)
routes.post('/target3', questaoTresController.questaoTres)
routes.get('/target4', questaoQuatroController.questaoQuatro)

export default routes