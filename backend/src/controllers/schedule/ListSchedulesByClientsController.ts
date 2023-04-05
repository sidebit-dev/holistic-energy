import { Request, Response } from "express";
import { ListScheduleByClientsService } from "../../services/schedule/ListScheduleByClientsService";

class ListSchedulesByClientsController {
  async handle(req: Request, res: Response) {

    const {client_id} = req.params;

    const listScheduleByClientsService = new ListScheduleByClientsService();

    const listClientSchedule = await listScheduleByClientsService.execute({
        client_id
    });

    return res.json(listClientSchedule);
  }
}

export { ListSchedulesByClientsController };