// import { parse } from "dotenv";
import prismaClient from "../../prisma";

interface DateScheduletRequest {
  therapist_id: string;
  therapy_id: string;
  diasSchedule: number;
}

class ListDateByTherapyTherapistService {
  async execute({
    therapist_id,
    therapy_id,
    diasSchedule,
  }: DateScheduletRequest) {
    function addDays(date, days) {
      date.setDate(date.getDate() + days);
      return date;
    }

    const data = new Date();

    let findDate: Date;

    let datas = [];

    for (let days = 1; days <= diasSchedule; days++) {
      findDate = addDays(data, days);

      const hoursSchedule = await prismaClient.schedule.findFirst({
        where: {
          therapy_id: therapy_id,
          AND: {
            therapist_id: therapist_id,
            AND: {
              scheduleDate: findDate,
            },
          },
        },
        select: {
          scheduleDate: true,
          hour: {
            select: {
              id: true,
              hour: true,
            },
          },
        },
      });

      const availableHour = await prismaClient.schedule.findMany({
        where: {
          scheduleDate: findDate,
        },
        select: {
          hour: {
            select: {
              id: true,
              hour: true,
            },
          },
        },
      });

      type Hours = {
        id: string;
        hour: string;
      }
  
      let hours: Hours[] = [];
      for (let index = 0; index < availableHour.length; index++) {
        const elementId = hoursSchedule[index].hour.id;
        const elementHour = hoursSchedule[index].hour.hour;
        hours.push({ id: elementId, hour: elementHour });
      }


      

      if (
        hoursSchedule.scheduleDate.getDay() !== 0 ||
        hoursSchedule.scheduleDate.getDay() !== 6
      ) {
        datas.push(hoursSchedule.scheduleDate);
      }
    }

    return { datas };
  }
}

export { ListDateByTherapyTherapistService };
