import { Request, Response } from "express";
import { DeleteHourService } from "../../services/hour/DeleteHourService";

class DeleteHourController{
    async handle(req: Request, res: Response){

       const id = req.params.id
     //  console.log( `O parâmetro é: ${ id }` )

        const deleteHourService = new DeleteHourService()

        const hours = await deleteHourService.execute({
            id
        })

        return res.json(hours);
    }
}

export { DeleteHourController }