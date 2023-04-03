import prismaClient from "../../prisma";

class ListHourService {
  async execute() {
    const hours = await prismaClient.hour.findMany({
      select: {
        id: true,
        hour: true,
      },
      orderBy:{
        hour: 'asc'
      }
    });
    return hours;
  }
}

export { ListHourService };
