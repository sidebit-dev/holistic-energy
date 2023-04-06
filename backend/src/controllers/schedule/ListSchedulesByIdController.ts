import { Request, Response } from "express";
import { ListScheduleByIdService } from "../../services/schedule/ListScheduleByIdService";

class ListSchedulesByIdController {
  async handle(req: Request, res: Response) {

    const {id} = req.params;

    const listScheduleByIdService = new ListScheduleByIdService();

    const listScheduleById = await listScheduleByIdService.execute({
        id
    });

    return res.json(listScheduleById);
  }
}

export { ListSchedulesByIdController };