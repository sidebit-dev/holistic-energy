import { Request, Response } from "express";
import { ListScheduleService } from "../../services/schedule/ListScheduleService";

class ListScheduleController{
    async handle(req: Request, res: Response){
        const listScheduleService = new ListScheduleService();
        const schedule = await listScheduleService.execute();

        return res.json(schedule);
    }
}

export { ListScheduleController }