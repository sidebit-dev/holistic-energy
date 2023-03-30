import prismaClient from "../../prisma";

interface HourRequest {
  id: string;
}

class DeleteHourService {
  async execute({ id }: HourRequest) {
    if (id === "") {
      throw new Error("Pesquisa inválida");
    }

    const verifyHour = await prismaClient.hour.findFirst({
      where: {
        id: id,
      }
    });

    if (!verifyHour) {
      throw new Error("Hora não encontrada.");
    } else {
      const hours = await prismaClient.hour.delete({
        where: {
          id: id,
        },
      });

      return {message: "Hora deletada com sucesso"}
    }
  }
}

export { DeleteHourService };
