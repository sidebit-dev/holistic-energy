import prismaClient from "../../prisma";

interface TherapistRequest {
id: string;
dateNow?: string;
}

const data = new Date()
const dias = 30

function addDays(date, days){
  date.setDate(date.getDate() + days);
  return date;
}

class ListScheduleByTherapistService {
  async execute({ id, dateNow  }: TherapistRequest) {

    const novaData =  addDays(data, dias)

    const dataAgenda = novaData.toISOString().slice(0,10)

    // console.log(dataAgenda)
    // console.log(id)

    //const dataAgenda = new Date(dateNow.replace("-", "/"));

    const listTherapistSchedule = await prismaClient.schedule.findMany({
      where: {
        thepapist_id: id,
      },
      select:{
        user_id: true,
        therapy_id: true,
        scheduleDate: true,
        hour_id: true,
        comment: true,
        }

    });

    if (!listTherapistSchedule) {
      throw new Error("O Terapeuta não tem Agendamento.");
    } 

    return {listTherapistSchedule};
  }
}

export { ListScheduleByTherapistService };
