import { Request, Response } from "express";
import { ListScheduleByClientService } from "../../services/schedule/ListScheduleByClientService";

class ListSchedulesByClientController {
  async handle(req: Request, res: Response) {

    const {id} = req.params;

    const listScheduleByClientService = new ListScheduleByClientService();

    const listClientSchedule = await listScheduleByClientService.execute({
        id
    });

    return res.json(listClientSchedule);
  }
}

export { ListSchedulesByClientController };