import prismaClient from "../../prisma";

class AvailableHoursService {
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

    if (hours.length === 0){
      throw new Error("Nenhum registro de Horas")
    }

    return hours;
  }
}

export { AvailableHoursService };
