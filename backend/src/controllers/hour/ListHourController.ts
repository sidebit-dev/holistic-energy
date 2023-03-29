import { Request, Response } from "express";
import { ListHourService } from "../../services/hour/ListHourService";

class ListHourController{
    async handle(req: Request, res: Response){
        const listHourService = new ListHourService();
        const hour = await listHourService.execute();

        return res.json(hour);
    }
}

export { ListHourController }