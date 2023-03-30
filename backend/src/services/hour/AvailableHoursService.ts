import prismaClient from "../../prisma";

class AvailableHoursService {
  async execute() {

    const hours = await prismaClient.hour.findMany({
      select: {
        id: true,
        hour: true,
      }
    });
    return hours;
  }
}

export { AvailableHoursService };
