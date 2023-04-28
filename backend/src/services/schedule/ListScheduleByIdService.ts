import prismaClient from "../../prisma";

interface ScheduleRequest {
  id: string;
}

class ListScheduleByIdService {
  async execute({ id }: ScheduleRequest) {
    const listScheduleById = await prismaClient.schedule.findMany({
      where: {
        id: id,
      },
      select: {
        scheduleDate: true,
        hour:{
          select:{
            id: true,
            hour: true,
          }
        },
        user: {
          select:{
            id: true,
            name: true,
            email: true,
          }
        },
        therapy:{
          select:{
            id: true,
            name: true,
          }
        },
        therapist:{
          select:{
            user:{
              select:{
                id: true,
                name: true,
                email: true,
              }
            }
          }
        },
        comment: true,
      },
    });

    if (listScheduleById.length === 0) {
      throw new Error("Não existe Agendamento para o Cliente.");
    }

    return { listScheduleById };
  }
}

export { ListScheduleByIdService };
