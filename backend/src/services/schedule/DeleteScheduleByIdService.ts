import prismaClient from "../../prisma";

interface ScheduleRequest {
id: string;
}

class DeleteScheduleByIdService {
  async execute({ id }: ScheduleRequest) {

    const existSchedule = await prismaClient.schedule.findFirst({
      where:{
        id: id
      }
    })

    if (!existSchedule) {
      return {error: "Agendamento não existe."};
    } 

    const deleteScheduleById = await prismaClient.schedule.delete({
      where: {
        id: id
      }
    });

    return {message: "Agendamento deletado com sucesso."};
  }
}

export { DeleteScheduleByIdService };
