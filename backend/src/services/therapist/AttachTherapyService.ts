import { Role, TherapistOnTherapy } from '@prisma/client';
import prismaClient from "../../prisma";

interface AttachRequest {
    user_id: string;
    user_therapist: string;
    id_therapy: string;  
  }

class AttachTherapyService{

    async execute({user_id, user_therapist ,id_therapy}: AttachRequest){

        const user = await prismaClient.user.findFirst({
            where:{
                id: user_id
            },
            select:{
                name: true,
                email: true,
                role: true
            }
        })

        if(!user || user.role !== "ADMIN"){
            throw new Error("Usuário não autorizado...");
        }

        const therapist = await prismaClient.therapist.findFirst({
            where:{
                user_id: user_therapist
            },
            select:{
                id: true
            }
        })

        if(!therapist){
            throw new Error("O Terapeuta não consta no banco de dados...");
        };

        const therapy = await prismaClient.therapy.findFirst({
            where:{
                id: id_therapy
            },
            select:{
                id: true,
                name: true,
                description: true
            }            
        });

        if(!therapy){
            throw new Error("A Terapia não consta no banco de dados...");
        }

        let attach: TherapistOnTherapy
        try {
            attach = await prismaClient.therapistOnTherapy.create({
                data:{
                    therapist_id: therapist.id,
                    therapy_id: therapy.id
                }
            })
        } catch (err) {
            console.log(err)
            throw new Error(`A Terapia ${therapy.name} já consta \nno cadastro do Terapeuta.`);
        }

        // return [user, therapist, therapy]
        return [user, therapy, attach]
    }
}

export { AttachTherapyService }