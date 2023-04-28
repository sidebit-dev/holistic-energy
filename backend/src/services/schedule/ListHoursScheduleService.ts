import prismaClient from "../../prisma";

interface HoursScheduletRequest {
  therapist_id: string;
  dataSchedule: string;
  days: number;
}

class ListHoursScheduleService {
  async execute({
    therapist_id,
    dataSchedule,
    days,
  }: HoursScheduletRequest) {
    const data = new Date(dataSchedule);

    const findRestrictionDate = await prismaClient.restrictionDate.findMany({
      where: {
        therapist_id: therapist_id,
      },
      select: {
        id: true,
        date: true,
        restrictionHour: {
          select: {
            id: true,
            hour: true,
          },
        },
      },
    });

    // CONSTRUINDO O ARRAY DE DATAS RESTRITIVAS DO TERAPEUTA
    type Dates = {
      id: string;
      date: Date;
    };

    let dates: Dates[] = [];
    for (let index = 0; index < findRestrictionDate.length; index++) {
      const elementId = findRestrictionDate[index].id;
      const elementDate = findRestrictionDate[index].date;
      dates.push({ id: elementId, date: elementDate });
    }

    // PEGANDO AS DATAS EM QUE O TERAPEUTA COMPLETOU TODOS OS HORÁRIOS
    

    type ListDateMonth = {
      id: string;
      date: string;
    };

    let availableDates: ListDateMonth[] = [];

    function addDays(date, days) {
      date.setDate(date.getDate() + days);
      return date;
    }

    function generationDates(days: number) {
      for (let index = 0; index <= days; index++) {
        const dataInicial = new Date();
        const novaData = addDays(dataInicial, index);
        const elementId = index.toString();
        const elementDate = novaData.toISOString().slice(0, 10);
        availableDates.push({ id: elementId, date: elementDate });
      }

      return { availableDates };
    }

    const dias = days < 1 ? (days = 1) : days >= 60 ? (days = 60) : days;

    const periodo = generationDates(dias);

    const dateAvailable = availableDates.filter((date) => {
      for (let index = 0; index < dates.length; index++) {
        if (date.date === dates[index].date.toISOString().slice(0, 10) || (new Date(date.date).getDay()) === 6 || (new Date(date.date).getDay()) === 5)
          return false;
      }
      return true;
    });

    const hoursSchedule = await prismaClient.schedule.findMany({
      where: {
        therapist_id: therapist_id,
        AND: {
          scheduleDate: data,          
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
    };

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
        hour: "asc",
      },
    });

    if (listHours.length === 0) {
      throw new Error("Não existe Horas cadastradas.");
    }

    const hoursAvailable = listHours.filter((hour) => {
      for (let index = 0; index < hours.length; index++) {
        if (hour.id === hours[index].id) 
        return false;
      }
      return true;
    });

    return { hoursAvailable, findRestrictionDate, dateAvailable };
  }
}

export { ListHoursScheduleService };
