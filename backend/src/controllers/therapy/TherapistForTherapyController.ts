import { Request, Response } from "express";
import { TherapistForTherapyService } from "../../services/therapy/TherapistForTherapyService";

class TherapistForTherapyController{
    async handle(req: Request, res: Response){

       const therapy_id = req.params.id
     //  console.log( `O parâmetro é: ${ id }` )

        const therapistForTherapyService = new TherapistForTherapyService()

        const hours = await therapistForTherapyService.execute({
            therapy_id
        })

        return res.json(hours);
    }
}

export { TherapistForTherapyController }