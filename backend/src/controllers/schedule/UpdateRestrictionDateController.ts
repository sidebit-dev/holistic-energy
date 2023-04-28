import { Request, Response } from "express";
import { UpdateRestrictionDateService } from "../../services/schedule/UpdateRestrictionDateService";

class UpdateRestrictionDateController{
    async handle(req: Request, res: Response){

       const id = req.params.p1;
       
        const {restrictionHour} = req.body;

        const updateRestrictionDateService = new UpdateRestrictionDateService()

        const restriction = await updateRestrictionDateService.execute({
            id, 
            restrictionHour
        })

        return res.json(restriction);
    }
}

export { UpdateRestrictionDateController }