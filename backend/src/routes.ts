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
import { CreateScheduleController } from "./controllers/schedule/CreateScheduleController";
import { CreateHourController } from "./controllers/hour/CreateHourController";
import { ListHourController } from "./controllers/hour/ListHourController";
import { ListScheduleController } from "./controllers/schedule/ListScheduleController";
import { UpdateHourController } from "./controllers/hour/UpdateHourController";
import { UpdateScheduleController } from "./controllers/schedule/UpdateScheduleController";
import { FindHourIdController } from "./controllers/hour/FindHourIdController";
import { DeleteHourController } from "./controllers/hour/DeleteHourController";
import { AvailableHoursController } from "./controllers/hour/AvailableHoursController";
import { TherapistForTherapyController } from "./controllers/therapy/TherapistForTherapyController";
import { TherapyForTherapistController } from "./controllers/therapist/TherapyForTherapistController";
import { ListHoursScheduleController } from "./controllers/schedule/ListHoursScheduleController";
import { ListSchedulesByClientController } from "./controllers/schedule/ListSchedulesByClientController";
import { ListSchedulesByTherapistController } from "./controllers/schedule/ListSchedulesByTherapistController";
import { ListSchedulesByIdController } from "./controllers/schedule/ListSchedulesByIdController";



const router = Router()

// -- Rotas USER --
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
// router.get('/me', new DetailUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)

// -- Rotas Therapy --
router.post('/therapy', isAuthenticated, new CreateTherapyController().handle)
router.get('/therapy', new ListTherapyController().handle)
router.get('/therapy/therapist/:id', isAuthenticated, new TherapistForTherapyController().handle)

// -- Rotas Therapist --
router.post('/therapist', isAuthenticated, new CreateTherapistController().handle)
router.post('/therapist/add/therapy', isAuthenticated, new AttachTherapyController().handle)
router.get('/therapist/therapy/:id', isAuthenticated, new TherapyForTherapistController().handle)

// -- Rotas Admin --
router.post('/admin', isAuthenticated, new CreateAdminController().handle)

// --Rotas Hour --
router.post('/add/hour', isAuthenticated, new CreateHourController().handle)
router.get('/hour', isAuthenticated, new ListHourController().handle)
router.get('/hour/available', isAuthenticated , new AvailableHoursController().handle)
router.put('/hour/up/:id', isAuthenticated, new UpdateHourController().handle)
router.get('/hour/:id', isAuthenticated, new FindHourIdController().handle)
router.delete('/hour/:id', isAuthenticated, new DeleteHourController().handle)


// -- Rotas Schedule --
router.post('/schedule', isAuthenticated, new CreateScheduleController().handle)
router.get('/schedule', isAuthenticated, new ListScheduleController().handle)
router.get('/schedule/hours/:p1/:p2/:p3', isAuthenticated, new ListHoursScheduleController().handle)
router.get('/schedule/list/therapist/:id', isAuthenticated, new ListSchedulesByTherapistController().handle)
router.get('/schedule/list/client/:id', isAuthenticated, new ListSchedulesByClientController().handle)
router.get('/schedule/list/:id', isAuthenticated, new ListSchedulesByIdController().handle)
router.put('/schedule/up/:id', isAuthenticated, new UpdateScheduleController().handle)

export { router }
