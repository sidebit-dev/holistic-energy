import prismaClient from "../../prisma";

interface ScheduleRequest {
  therapy_id: string;
  therapist_id: string;
  scheduleDate: string;
  hour_id: string;
  user_id: string;
  comment: string;
}

class CreateScheduleService {
  async execute({
    therapy_id,
    therapist_id,
    scheduleDate,
    hour_id,
    user_id,
    comment,
  }: ScheduleRequest) {

    const therapy = await prismaClient.therapy.findFirst({
      where:{
        id: therapy_id
      },
      select:{
        id: true,
        name: true,
        description: true
      }
    })

    if(!therapy){
      throw new Error("Terapia não encontrada")
    }

    const therapist = await prismaClient.user.findFirst({
      where:{
        id: therapist_id
      },
      select:{
        id: true,
        name: true        
      }
    })

    if(!therapist){
      throw new Error("Terapeuta não encontrado(a)")
    }

    const hour = await prismaClient.hour.findFirst({
      where:{
        id: hour_id
      },
      select:{
        id: true,
        hour: true        
      }
    })

    if(!hour){
      throw new Error("Hora não cadastrada")
    }

    const user = await prismaClient.user.findFirst({
      where:{
        id: user_id
      },
      select:{
        id: true,
        name: true        
      }
    })

    if(!user){
      throw new Error("Cliente não encontrado")
    }

    const dataAgenda = new Date(scheduleDate.replace("-", "/"));

    try {
      const schedule = await prismaClient.schedule.create({
        data: {
          therapy_id: therapy_id,
          thepapist_id: therapist_id,
          scheduleDate: dataAgenda,
          hour_id: hour_id,
          user_id: user_id,
          comment: comment,
        },
        select: {
          id: true,
        },
      });

      return [schedule, therapy, therapist, scheduleDate, hour, user, comment];
    } catch (err) {
      return {error: "Não foi possível agendar..."};
    }
  }
}

export { CreateScheduleService };
