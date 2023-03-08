import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad{
    sub: string;
}

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
       return next();

    } catch (err) {
        return res.status(401).end();
    }
}