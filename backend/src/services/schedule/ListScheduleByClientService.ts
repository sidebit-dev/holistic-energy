import prismaClient from "../../prisma";

interface ClientRequest {
id: string;
dateNow?: string;
}

const data = new Date()
const dias = 30

function addDays(date, days){
  date.setDate(date.getDate() + days);
  return date;
}

class ListScheduleByClientService {
  async execute({ id, dateNow  }: ClientRequest) {

    const novaData =  addDays(data, dias)

    //console.log(novaData.toISOString().slice(0,10));

    const dataAgenda = novaData.toISOString().slice(0,10)

    //console.log(dataAgenda)
    //const dataAgenda = new Date(dateNow.replace("-", "/"));

    const listClientSchedule = await prismaClient.schedule.findMany({
      where: {
        user_id: id
      },
      select:{
        therapy:{
          select:{
            name: true,
          }
        },
        therapist:{
          select:{
            user:{
              select:{
                name: true,
              }
            }
          }
        },
        scheduleDate: true,
        hour:{
          select:{
            hour: true,
          }
        },
        comment: true
        }

    });

     if (listClientSchedule.length === 0) {
      throw new Error("Não existe Agendamento para o Cliente.");
    } 

    return {listClientSchedule};
  }
}

export { ListScheduleByClientService };
