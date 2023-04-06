import { Request, Response } from "express";
import { DeleteScheduleByIdService } from "../../services/schedule/DeleteScheduleByIdService";

class DeleteSchedulesByIdController {
  async handle(req: Request, res: Response) {

    const {id} = req.params;

    const deleteScheduleByIdService = new DeleteScheduleByIdService();

    const deleteScheduleById = await deleteScheduleByIdService.execute({
        id
    });

    return res.json(deleteScheduleById);
  }
}

export { DeleteSchedulesByIdController };