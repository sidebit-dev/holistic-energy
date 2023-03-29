import prismaClient from "../../prisma";

interface HourRequest {
  id: string;
  hour: string;
}

class UpdateHourService {
  async execute({ id, hour }: HourRequest) {
    if (hour === "") {
      throw new Error("Hora inválida");
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
    } else {
        hours = await prismaClient.hour.update({
            where:{
                id: id
            },
            data:{
                hour: hour
            },
            select:{
                id: true,
                hour: true
            }
        })
    } 

    return hours;
    //  return {id: id, hour: hour}
  }
}

export { UpdateHourService };
