import { Request, Response } from "express";
import { TherapyForTherapistService } from "../../services/therapist/TherapyForTherapistService";

class TherapyForTherapistController{
    async handle(req: Request, res: Response){

       const therapist_id = req.params.id
     //  console.log( `O parâmetro é: ${ id }` )

        const therapyForTherapistService = new TherapyForTherapistService()

        const therapy = await therapyForTherapistService.execute({
            therapist_id
        })

        return res.json(therapy);
    }
}

export { TherapyForTherapistController }