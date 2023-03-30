import { Request, Response } from "express";
import { FindHourIdService } from "../../services/hour/FindHourIdService";

class FindHourIdController{
    async handle(req: Request, res: Response){

       const id = req.params.id
     //  console.log( `O parâmetro é: ${ id }` )

        const findHourIdController = new FindHourIdService()

        const hours = await findHourIdController.execute({
            id
        })

        return res.json(hours);
    }
}

export { FindHourIdController }