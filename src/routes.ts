import { Router } from "express";
import { server } from "./controllers/Server";
import QuestaoUmController from "./controllers/QuestaoUmController";
import QuestaoDoisController from "./controllers/QuestaoDoisController";
import QuestaoTresController from "./controllers/QuestaoTresController";
import { QuestaoQuatroController } from "./controllers/QuestaoQuatroController";
import { QuestaoCincoController } from "./controllers/QuestaoCincoController";




const routes = Router()

const questaoUmController = new QuestaoUmController()
const questaoDoisController = new QuestaoDoisController()
const questaoTresController = new QuestaoTresController()
const questaoQuatroController = new QuestaoQuatroController()
const questaoCincoController = new QuestaoCincoController()

routes.get('/', server)
routes.get('/target1', questaoUmController.questaoUm)
routes.post('/target2', questaoDoisController.questaoDois)
routes.post('/target3', questaoTresController.questaoTres)
routes.get('/target4', questaoQuatroController.questaoQuatro)
routes.get('/target5', questaoCincoController.questaoCinco)

export default routes