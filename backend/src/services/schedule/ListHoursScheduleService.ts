import { parse } from "dotenv";
import prismaClient from "../../prisma";

interface HoursScheduletRequest {
  therapist_id: string;
  therapy_id: string;
  dataSchedule: string;
}

class ListHoursScheduleService {
  async execute({
    therapist_id,
    therapy_id,
    dataSchedule,
  }: HoursScheduletRequest) {
    const data = new Date(dataSchedule);

    const hoursSchedule = await prismaClient.schedule.findMany({
      where: {
        therapy_id: therapy_id,
        AND: {
          thepapist_id: therapist_id,
          AND: {
            scheduleDate: data,
          },
        },
      },

      orderBy: {
        hour: {
          hour: "asc",
        },
      },
      select: {
        therapy: {
          select: {
            id: true,
            name: true,
          },
        },
        therapist: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        scheduleDate: true,
        hour: {
          select: {
            id: true,
            hour: true,
          },
        },
      },
    });

    // PEGANDO OS HORÁRIOS DO DIA DO TERAPEUTA
    type Hours = {
      id: string;
      hour: string;
    }

    let hours: Hours[] = [];
    for (let index = 0; index < hoursSchedule.length; index++) {
      const elementId = hoursSchedule[index].hour.id;
      const elementHour = hoursSchedule[index].hour.hour;
      hours.push({ id: elementId, hour: elementHour });
    }

    // HORAS DISPONÍVEIS DO TERAPEUTA
    const listHours = await prismaClient.hour.findMany({
      select: {
        id: true,
        hour: true,
      },
      orderBy: {
        hour: 'asc'
      }
    });

    const hoursAvailable = listHours.filter(hour => {
      for (let index = 0; index < hours.length; index++) {
        if (hour.id === hours[index].id)
        return false
      }
      return true
    })

    return {hoursAvailable};
    // return [hoursSchedule, hours];
  }
}

export { ListHoursScheduleService };
