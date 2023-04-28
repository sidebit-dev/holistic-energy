import prismaClient from "../../prisma";

interface RestrictionRequest {
therapist_id: string;
dateNow?: string;
}

const data = new Date()
const dias = 30

function addDays(date, days){
  date.setDate(date.getDate() + days);
  return date;
}

class ListRestrictionDateService {
  async execute({ therapist_id, dateNow  }: RestrictionRequest) {

    const novaData =  addDays(data, dias)

    //console.log(novaData.toISOString().slice(0,10));

    const dataAgenda = novaData.toISOString().slice(0,10)

    //console.log(dataAgenda)
    //const dataAgenda = new Date(dateNow.replace("-", "/"));

    const listRestriction = await prismaClient.restrictionDate.findMany({
      where: {
        therapist_id: therapist_id
      },
      select:{
        id: true,
        date: true,
        restrictionHour: {
          select:{
            id: true,
            hour: true,
          },
          orderBy:{
            hour: 'asc'
          }
        }
        },
        orderBy:{
            date: 'asc'
        }

    });

    if (listRestriction.length === 0) {
      throw new Error("Não existe Restrição de Agendamento.");
    } 

    return {listRestriction};
  }
}

export { ListRestrictionDateService };
