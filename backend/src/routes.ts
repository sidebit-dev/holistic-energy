import { Router } from "express";

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateTherapyController } from "./controllers/therapy/CreateTherapyController";

import { isAuthenticated } from "./middlewares/isAuthenticated";
import { ListTherapyController } from "./controllers/therapy/ListTherapyController";



const router = Router()

// -- Rotas USER --
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
// router.get('/me', new DetailUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)

// Rotas Therapy --
router.post('/therapy', isAuthenticated, new CreateTherapyController().handle)
router.get('/therapy', new ListTherapyController().handle)

export { router }
