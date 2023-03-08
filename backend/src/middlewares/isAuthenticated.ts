import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad{
    sub: string;
}

// USADO PARA TODAS AS ROTAS QUE O USUARIO ESTEJA LOGADO

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){
    // console.log("Chamou esse middleware")
    // Receber o token
    const authToken = req.headers.authorization;
    if(!authToken){
        return res.status(401).end();
    }
    // console.log(authToken);
    const [, token] = authToken.split(" ")
    // console.log(token)
    
    try {
        // Validar o token, descontruindo o sub = id do usuario
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as PayLoad

       // console.log(sub); // Agora é deixar proceguir

       // PODEMOS CRIAR UMA VARIAVEL user_id PARA TODOS QUE ACESSAREM
       // Recuperar o id do token e colocar dentro de uma variável user_id dentro do req.
       req.user_id = sub;

       return next();

    } catch (err) {
        return res.status(401).end();
    }
}