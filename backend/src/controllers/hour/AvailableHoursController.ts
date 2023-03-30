import { Request, Response } from "express";
import { AvailableHoursService } from "../../services/hour/AvailableHoursService";

class AvailableHoursController{
    async handle(req: Request, res: Response){
        const availableHoursService = new AvailableHoursService();
        const hour = await availableHoursService.execute();

        return res.json(hour);
    }
}

export { AvailableHoursController }