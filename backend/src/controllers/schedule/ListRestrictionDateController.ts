import { Request, Response } from "express";
import { ListRestrictionDateService } from "../../services/schedule/ListRestrictionDateService";

class ListRestrictionDateController {
  async handle(req: Request, res: Response) {

    const therapist_id = req.params.id;

    const listRestrictionDateService = new ListRestrictionDateService();

    const listRestriction = await listRestrictionDateService.execute({
        therapist_id
    });

    return res.json(listRestriction);
  }
}

export { ListRestrictionDateController };