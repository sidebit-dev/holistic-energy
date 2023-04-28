import { Request, Response } from "express";
import { CreateRestrictionDateService } from "../../services/schedule/CreateRestrictionDateService";

class CreateRestrictionDateController{
    async handle(req: Request, res: Response){

       const therapist_id = req.params.id
     //  console.log( `O parâmetro é: ${ id }` )

        const {restrictionDate, restrictionHour} = req.body;

        const createRestrictionDateService = new CreateRestrictionDateService()

        const restriction = await createRestrictionDateService.execute({
            therapist_id, 
            restrictionDate, 
            restrictionHour
        })

        return res.json(restriction);
    }
}

export { CreateRestrictionDateController }