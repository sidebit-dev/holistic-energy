import prismaClient from "../../prisma";

interface ClientRequest {
client_id: string;
dateNow?: string;
}

const data = new Date()
const dias = 30

function addDays(date, days){
  date.setDate(date.getDate() + days);
  return date;
}

class ListScheduleByClientsService {
  async execute({ client_id, dateNow  }: ClientRequest) {

    const novaData =  addDays(data, dias)

    //console.log(novaData.toISOString().slice(0,10));

    const dataAgenda = novaData.toISOString().slice(0,10)

    console.log(dataAgenda)

    //const dataAgenda = new Date(dateNow.replace("-", "/"));

    const listClientSchedule = await prismaClient.schedule.findMany({
      where: {
        user_id: client_id
      },
      select:{
        therapy_id: true,
        thepapist_id: true,
        scheduleDate: true,
        hour_id: true,
        user_id: true,
        comment: true
        }

    });

    if (!listClientSchedule) {
      throw new Error("O Cliente não tem Agendamento.");
    } 

    return {listClientSchedule};
  }
}

export { ListScheduleByClientsService };
