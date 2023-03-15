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

    return user;
}
}

export { CreateTherapistService };

//     if (role !== "ADMIN") {
//       throw new Error("Usuário não autorizado...");
//     }

//     const user = await prismaClient.user.findFirst({
//       where:{
//         id: user_id
//       },
//       select:{
//         id: true,
//         name: true,
//         email: true,
//         active: true
//       }
//     })

//     if(!user || user.active === false ){
//       throw new Error("Usuário não encontrado ou inativo...");
//     }

//     try {
//       const clientUpdate = await prismaClient.user.update({
//         where: {
//           id: user_id,
//         },
//         data: {
//           role: "THERAPIST",
//         },
//         select: {
//           role: true,
//         },
//       });

//       if(clientUpdate.role !== 'THERAPIST'){
//         throw new Error(`Não foi possível a atribuir Terapeuta à ${user.name}`);
//       }

//       const existTherapist = await prismaClient.therapist.findFirst({
//         where:{
//           user_id: user_id
//         },
//         select:{
//           id: true
//         }
        
//       })
   

//       const therapist = await prismaClient.therapist.create({
//         data:{
//           user_id: user_id          
//         },
//         select:{
//           id: true,
//           user_id: true         
//         }
//       });

//       const therapy = await prismaClient.therapy.findFirst({
//         where:{
//           id: therapy_id
//         },
//         select:{
//           id: true,
//           name: true,
//           description: true          
//         }
//       })

//       const addTherapyInTherapist = await prismaClient.therapistOnTherapy.create({
//         data:{
//           therapist_id: therapist.id,
//           therapy_id: therapy_id
//         },
//         select:{
//           therapist_id: true,
//           therapy_id: true
//         }

//       });

//     return [user,{idTherapist: therapist.id}, therapy];

//     } catch (err) {
//       throw new Error("Erro na relação Terapeuta com Terapia");
//     }
//   }
// }


