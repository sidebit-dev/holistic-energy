import { Router, Request, Response } from "express";

const router = Router()

router.get('/teste', (req: Request, res: Response) => {
   return res.json({Sistema: "Holistic Ernergy - Online!!"})

   // Teste de Erro
   // throw new Error('Erro ao fazer essa requisição')
})

export { router }
