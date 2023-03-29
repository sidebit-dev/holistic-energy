import { Request, Response } from "express";
import { UpdateHourService } from "../../services/hour/UpdateHourService";

class UpdateHourController{
    async handle(req: Request, res: Response){

       const id = req.params.id
     //  console.log( `O parâmetro é: ${ id }` )

        const { hour } = req.body;

        const updateHourService = new UpdateHourService()

        const hours = await updateHourService.execute({
            id,
          hour
        })

        return res.json(hours);
    }
}

export { UpdateHourController }