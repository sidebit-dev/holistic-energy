import { Role } from '@prisma/client';
import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';

interface UserRequest{
    name: string;
    email: string;
    password: string;
    role: Role;
}

class CreateUserService{
    async excute({name, email, password, role}: UserRequest){
        
        // Verificar se ele enviou um email
        if(!email){
            throw new Error("Email incorreto")
        }

        // Verificar se o email já esta cadastrao na plataforma
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExists){
            throw new Error("Usuário já existe")
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash,
                role: role
            },
            select:{
                id: true,
                name: true,
                email: true,
                role: true,
            }
        })
  
        return user;
    }
}

export { CreateUserService }