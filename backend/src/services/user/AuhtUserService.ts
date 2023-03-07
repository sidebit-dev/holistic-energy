import prismaClient from "../../prisma";
import { compare } from 'bcryptjs';

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

        

        return { Ok: true}
    }
}

export { AuthUserService };