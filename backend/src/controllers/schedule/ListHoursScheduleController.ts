import { Request, Response } from "express";
import { ListHoursScheduleService } from "../../services/schedule/ListHoursScheduleService";

class ListHoursScheduleController {
  async handle(req: Request, res: Response) {

    const {p1, p2} = req.params;

    const therapist_id = p1
    const dataSchedule = p2
    const {days} = req.body

    //  console.log( `O parâmetro é: ${ days }` )

    const listHoursScheduleService = new ListHoursScheduleService();

    const hoursSchedule = await listHoursScheduleService.execute({
        therapist_id,
        dataSchedule,
        days,
    });

    return res.json(hoursSchedule);
  }
}

export { ListHoursScheduleController };
