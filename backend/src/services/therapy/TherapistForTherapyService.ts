import prismaClient from "../../prisma";

interface TherapistRequest {
    therapy_id: string;
}

class TherapistForTherapyService {
  async execute({therapy_id}: TherapistRequest) {
    const therapist = await prismaClient.therapist.findMany({
        where:{
            therapy:{
                some:{
                    therapy_id: therapy_id
                }
            } 
        },
        select:{
            user:{
                select:{
                    id: true,
                    name: true
                }
            }
        }
    });

    return therapist;
  }
}

export { TherapistForTherapyService };
