import prismaClient from "../../prisma";

interface TherapyRequest {
    therapist_id: string;
}

class TherapyForTherapistService {
  async execute({therapist_id}: TherapyRequest) {
    const therapy = await prismaClient.therapy.findMany({
        where:{
            therapist:{
                some:{
                    therapist_id: therapist_id
                }
            } 
        },
        select:{
            id: true,
            name: true
        }
    });

    if (therapy.length === 0){
        throw new Error("Terapeuta não tem cadastro de Terapia")
      }

    return therapy;
  }
}

export { TherapyForTherapistService };
