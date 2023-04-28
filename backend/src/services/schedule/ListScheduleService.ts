import prismaClient from "../../prisma";

class ListScheduleService {
  async execute(search, take, skip) { 
    
    console.log(search, take, skip)

    const schedule = await prismaClient.schedule.findMany({
      where:{
        therapist:{
          user:{
            name:{
              contains: String(search),
              mode: 'insensitive'
            }
          }
        }
      },
      select: {
        id: true,
        therapy: {
          select: {
            id: true,
            name: true,
          },
        },
        therapist: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        scheduleDate: true,
        hour: {
          select: {
            id: true,
            hour: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        comment: true,
      },
      orderBy: [
        {
          scheduleDate: "desc",
        },
        {
          hour: {
            hour: "asc",
          },
        },
      ],
      take: Number(take),
      skip: Number(skip)
    });

    if (schedule.length === 0) {
      throw new Error("Nenhum registro de Agendamento");
    }

    return {schedule};
  }
}

export { ListScheduleService };
