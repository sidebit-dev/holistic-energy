import prismaClient from "../../prisma";

class ListScheduleService {
  async execute() {
    const schedule = await prismaClient.schedule.findMany({
      select: {
        id: true,
        therapy_id: true,
        thepapist_id: true,
        scheduleDate: true,
        hour_id: true,
        user_id: true,
        comment: true,       
      },
      orderBy:{
        scheduleDate: 'desc'
      }

    });

    return schedule;
  }
}

export { ListScheduleService };