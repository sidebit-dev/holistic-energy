import { Request, Response } from "express";
import { CreateTherapistService } from "../../services/therapist/CreateTherapistService";

class CreateTherapistController{
    async handle(req: Request, res: Response){
        // console.log(req.body)
        const {name, email, password, role} = req.body

        const createTherapistService = new CreateTherapistService()
        const user = await createTherapistService.execute({
            name, email, password, role
        })
        // return res.json({Ok: true})
        return res.json(user)
    }
}

export { CreateTherapistController }