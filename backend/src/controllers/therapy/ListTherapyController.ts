import { Request, Response } from "express";
import { ListTherapyService } from "../../services/therapy/ListTherapyService";

class ListTherapyController{
    async handle(req: Request, res: Response){
        const listTherapyService = new ListTherapyService();
        const therapy = await listTherapyService.execute();

        return res.json(therapy);
    }
}

export { ListTherapyController }