import prismaClient from "../../prisma";

interface HourRequest {
  id: string;
}

class FindHourIdService {
  async execute({ id }: HourRequest) {
    if (id === "") {
      throw new Error("Pesquisa inválida");
    }

    let hours = await prismaClient.hour.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        hour: true,
      },
    });

    if(!hours){
        throw new Error("Hora não encontrada...");
    }   

    return hours;
  }
}

export { FindHourIdService };
