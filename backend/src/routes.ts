import { Router } from "express";

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateTherapyController } from "./controllers/therapy/CreateTherapyController";

import { isAuthenticated } from "./middlewares/isAuthenticated";
import { ListTherapyController } from "./controllers/therapy/ListTherapyController";
import { CreateTherapistController } from "./controllers/therapist/CreateTherapistController";
import { CreateAdminController } from "./controllers/admin/CreateAdminController";
import { AttachTherapyController } from "./controllers/therapist/AttachTherapyController";



const router = Router()

// -- Rotas USER --
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
// router.get('/me', new DetailUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)

// -- Rotas Therapy --
router.post('/therapy', isAuthenticated, new CreateTherapyController().handle)
router.get('/therapy', new ListTherapyController().handle)

// -- Rotas Therapist --
router.post('/therapist', isAuthenticated, new CreateTherapistController().handle)
router.post('/therapist/add/therapy', isAuthenticated, new AttachTherapyController().handle)

// -- Rotas Admin --
router.post('/admin', isAuthenticated, new CreateAdminController().handle)

export { router }
