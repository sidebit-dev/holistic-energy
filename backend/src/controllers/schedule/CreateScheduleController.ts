import { Request, Response } from "express";
import { CreateScheduleService } from "../../services/schedule/CreateScheduleService";

class CreateScheduleController {
  async handle(req: Request, res: Response) {
    const {
      therapy_id,
      therapist_id,
      scheduleDate,
      hour_id,
      user_id,
      comment,
    } = req.body;

    const createScheduleService = new CreateScheduleService();

    const schedule = await createScheduleService.execute({
      therapy_id,
      therapist_id,
      scheduleDate,
      hour_id,
      user_id,
      comment,
    });

    return res.json(schedule);
  }
}

export { CreateScheduleController };
