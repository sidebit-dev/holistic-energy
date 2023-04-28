import prismaClient from "../../prisma";

interface ScheduleRequest {
  therapy_id: string;
  therapist_id: string;
  scheduleDate: string;
  hour_id: string;
  user_id: string;
  comment: string;
}

class CreateScheduleService {
  async execute({
    therapy_id,
    therapist_id,
    scheduleDate,
    hour_id,
    user_id,
    comment,
  }: ScheduleRequest) {
    const therapy = await prismaClient.therapy.findFirst({
      where: {
        id: therapy_id,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    if (!therapy) {
      throw new Error("Terapia não encontrada");
    }

    const therapist = await prismaClient.user.findFirst({
      where: {
        id: therapist_id,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!therapist) {
      throw new Error("Terapeuta não encontrado(a)");
    }

    const hour = await prismaClient.hour.findFirst({
      where: {
        id: hour_id,
      },
      select: {
        id: true,
        hour: true,
      },
    });

    if (!hour) {
      throw new Error("Hora não cadastrada");
    }

    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!user) {
      throw new Error("Cliente não encontrado");
    }

    const dataAgenda = new Date(scheduleDate.replace("-", "/"));

    try {
      const schedule = await prismaClient.schedule.create({
        data: {
          therapy_id: therapy_id,
          therapist_id: therapist_id,
          scheduleDate: dataAgenda,
          hour_id: hour_id,
          user_id: user_id,
          comment: comment,
        },
        select: {
          id: true,
          scheduleDate: true,
        },
      });

      const horasTerapeupa = await horasRestantes();

      async function horasRestantes() {
        const data = new Date(schedule.scheduleDate);

        const findRestrictionDate = await prismaClient.restrictionDate.findMany(
          {
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
          }
        );

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
            if (hour.id === hours[index].id) return false;
          }
          return true;
        });

        if (!hoursAvailable.length) {
          await prismaClient.restrictionDate.create({
            data: {
              therapist_id: therapist_id,
              date: dataAgenda,
            },
          });
        }
      }

      return [schedule, therapy, therapist, scheduleDate, hour, user, comment];
    } catch (err) {
      return { error: "Não foi possível agendar..." };
    }
  }
}

export { CreateScheduleService };
