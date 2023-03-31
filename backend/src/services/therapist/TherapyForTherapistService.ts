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

    return therapy;
  }
}

export { TherapyForTherapistService };
