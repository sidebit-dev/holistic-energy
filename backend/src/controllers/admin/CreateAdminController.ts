import { Request, Response } from "express";
import { CreateAdminService } from "../../services/admin/CreateAdminService";

class CreateAdminController{
    async handle(req: Request, res: Response){
        // console.log(req.body)
        const {name, email, password, role} = req.body

        const createAdminService = new CreateAdminService()
        const user = await createAdminService.execute({
            name, email, password, role
        })
        // return res.json({Ok: true})
        return res.json(user)
    }
}

export { CreateAdminController }