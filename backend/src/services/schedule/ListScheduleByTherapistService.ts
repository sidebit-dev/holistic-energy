import prismaClient from "../../prisma";

interface TherapistRequest {
  id: string;
  date_ini?: string;
  date_fin?: string;
}


const dias = 30;

function addDays(date, days) {
  date.setUTCDate(date.getUTCDate() + days);
  return date;
}

function convertDate(dateX: Date) {
  const data = new Date(
    dateX.getUTCFullYear(),
    dateX.getUTCMonth(),
    dateX.getUTCDate()
  );
  return data;
}

class ListScheduleByTherapistService {
  async execute({ id, date_ini, date_fin }: TherapistRequest) {
    let dataInicial;
    let dataFinal;

    if (!date_ini) {
      const now = new Date();
      dataInicial = convertDate(now);
    } else {
      dataInicial = convertDate(new Date(date_ini));
    }

    if (!date_fin) {
      const now = new Date();
      dataFinal = convertDate(addDays(now, dias));
    } else {
      dataFinal = convertDate(new Date(date_fin));
    }

    const listTherapistSchedule = await prismaClient.schedule.findMany({
      where: {
        scheduleDate: {
          gte: dataInicial,
          lte: dataFinal,
        },
        therapist_id: id,
      },
      select: {
        user_id: true,
        therapy_id: true,
        scheduleDate: true,
        hour: {
          select: {
            id: true,
            hour: true,
          },
        },
        comment: true,
      },
    });

    if (listTherapistSchedule.length === 0) {
      return { message: "O Terapeuta não tem agendamento" };
    } else {
      return { listTherapistSchedule };
    }
  }
}

export { ListScheduleByTherapistService };
