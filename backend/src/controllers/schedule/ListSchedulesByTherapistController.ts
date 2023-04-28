import { Request, Response } from "express";
import { ListScheduleByTherapistService } from "../../services/schedule/ListScheduleByTherapistService";

class ListSchedulesByTherapistController {
  async handle(req: Request, res: Response) {

    const {id} = req.params;
    const {date_ini, date_fin} = req.body;

    const listScheduleByTherapistService = new ListScheduleByTherapistService();

    const listTherapistSchedule = await listScheduleByTherapistService.execute({
        id, date_ini, date_fin
    });

    return res.json(listTherapistSchedule);
  }
}

export { ListSchedulesByTherapistController };