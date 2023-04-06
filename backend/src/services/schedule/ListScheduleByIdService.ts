import prismaClient from "../../prisma";

interface ScheduleRequest {
id: string;
dateNow?: string;
}

const data = new Date()
const dias = 30

function addDays(date, days){
  date.setDate(date.getDate() + days);
  return date;
}

class ListScheduleByIdService {
  async execute({ id, dateNow  }: ScheduleRequest) {

    const novaData =  addDays(data, dias)

    //console.log(novaData.toISOString().slice(0,10));

    const dataAgenda = novaData.toISOString().slice(0,10)

    //console.log(dataAgenda)
    //const dataAgenda = new Date(dateNow.replace("-", "/"));

    const listScheduleById = await prismaClient.schedule.findMany({
      where: {
        id: id
      },
      select:{
        scheduleDate: true,
        hour_id: true,
        user_id: true,
        therapy_id: true,
        thepapist_id: true,        
        comment: true
        }

    });

    if (!listScheduleById) {
      throw new Error("Não exixte Agendamento.");
    } 

    return {listScheduleById};
  }
}

export { ListScheduleByIdService };
