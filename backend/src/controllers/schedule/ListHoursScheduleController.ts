import { Request, Response } from "express";
import { ListHoursScheduleService } from "../../services/schedule/ListHoursScheduleService";

class ListHoursScheduleController {
  async handle(req: Request, res: Response) {

    const {p1, p2, p3} = req.params;

    const therapy_id = p1
    const therapist_id = p2
    const dataSchedule = p3

    //  console.log( `O parâmetro é: ${ id }` )

    const listHoursScheduleService = new ListHoursScheduleService();

    const hoursSchedule = await listHoursScheduleService.execute({
        therapy_id,
        therapist_id,
        dataSchedule,
    });

    return res.json(hoursSchedule);
  }
}

export { ListHoursScheduleController };
