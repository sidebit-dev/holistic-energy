import { Request, Response } from "express";
import { AttachTherapyService } from "../../services/therapist/AttachTherapyService";

class AttachTherapyController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;
    const { user_therapist, id_therapy } = req.body;
    const attachTherapyService = new AttachTherapyService();
    const attach = await attachTherapyService.execute({
      user_id,  
      user_therapist,
      id_therapy,
    });
    // return res.json({Ok: true})
    return res.json(attach);
  }
}

export { AttachTherapyController };
