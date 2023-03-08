import prismaClient from "../../prisma";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken'

interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({email, password}: AuthRequest){
        // console.log(email)
        // Verificar se o email existe
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(!user){
            throw new Error("Usuário ou senha incorreto");
        }

        // Verificar se a senha enviada é correta
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new Error("Usuário ou senha incorreto");
        }

        // Gerar um token e devolver os dados do usuário com id, name, email e role
        // Se deu tudo certo, vamos gerar o token pro usuário
        const token = sign(
            {
            name: user.name,
            email: user.email
            },
            process.env.JWT_SECRET,
            {
               subject: user.id,                             
               expiresIn: '30d'               
            }
            )       

        return { 
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: token
        }
    }
}

export { AuthUserService };