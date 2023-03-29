import { Request, Response } from "express";
import { CreateHourService } from "../../services/hour/CreateHourService";

class CreateHourController{
    async handle(req: Request, res: Response){

        const { hour } = req.body;

        const createHourService = new CreateHourService()

        const hours = await createHourService.execute({
            hour
        })

        return res.json(hours);
    }
}

export { CreateHourController }