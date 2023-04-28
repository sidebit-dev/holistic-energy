import { Request, Response } from "express";
import { ListScheduleService } from "../../services/schedule/ListScheduleService";

class ListScheduleController{
    async handle(req: Request, res: Response){

        const {search, take, skip} = req.query;

        //console.log(search)

        const listScheduleService = new ListScheduleService();
        const schedule = await listScheduleService.execute( search, take, skip );

        return res.json(schedule);
    }
}

export { ListScheduleController }