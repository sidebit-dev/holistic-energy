import { Role } from '@prisma/client';
import prismaClient from "../../prisma";
import { hash } from 'bcryptjs';

interface TherapistRequest {
  name: string;
  email: string;
  password: string;
  role: Role;
}

class CreateTherapistService {
  async execute({name, email, password, role}: TherapistRequest) {

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

    const therapist = await prismaClient.therapist.create({
        data:{
            user_id: user.id
        },
        select:{
            id: true
        }        
    })

    return [user, therapist];
}
}

export { CreateTherapistService };