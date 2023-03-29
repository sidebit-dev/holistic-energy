import { Request, Response } from "express";
import { UpdateScheduleService } from "../../services/schedule/UpdateScheduleService";

class UpdateScheduleController{
    async handle(req: Request, res: Response){

       const id = req.params.id
     //  console.log( `O parâmetro é: ${ id }` )

        const { therapy_id, therapist_id, scheduleDate, hour_id, user_id, comment } = req.body;

        const updateScheduleService = new UpdateScheduleService()

        const schedule = await updateScheduleService.execute({
            id,
            therapy_id, 
            therapist_id, 
            scheduleDate, 
            hour_id, 
            user_id, 
            comment
        })

        return res.json(schedule);
    }
}

export { UpdateScheduleController }