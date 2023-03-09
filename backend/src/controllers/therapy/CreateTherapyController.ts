import { Request, Response } from "express";
import { CreateTherapyService } from "../../services/therapy/CreateTherapyService";

class CreateTherapyController{
    async handle(req: Request, res: Response){

        const { name } = req.body;

        const createTherapyService = new CreateTherapyService()

        const therapy = await createTherapyService.execute({
            name
        })

        return res.json(therapy);
    }
}

export { CreateTherapyController }