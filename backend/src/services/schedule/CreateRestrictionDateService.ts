import prismaClient from "../../prisma";

interface RestrictionRequest {
  therapist_id: string;
  restrictionDate: string;
  restrictionHour: string;
}

class CreateRestrictionDateService {
  async execute({
    therapist_id,
    restrictionDate,
    restrictionHour,
  }: RestrictionRequest) {
    // const dataAgenda = new Date(restrictionDate);

    const dataAgenda = new Date(restrictionDate.replace("-", "/"));

    const dataAtual = new Date();

    if (dataAgenda < dataAtual) {
      return { message: "A data deve ser futura." };
    }
    // console.log(restrictionDate, dataAgenda, therapist_id, restrictionHour);

    async function existHour(restrictionHour) {
      const existHour = await prismaClient.hour.findFirst({
        where: {
          hour: restrictionHour,
        },
        select: {
          id: true,
          hour: true,
        },
      });

      if (existHour) {
        return true;
      } else {
        return false;
      }
    }

    async function addHour(restriction_id, restrictionHour) {
      const findHourRestriction = await prismaClient.restrictionHour.findFirst({
        where: {
          restrictionDate_id: restriction_id,
          AND: {
            hour: restrictionHour,
          },
        },
        select: {
          restrictionDate: {
            select: {
              date: true,
            },
          },
          hour: true,
        },
      });

      if (findHourRestriction) {
        const data = findHourRestriction.restrictionDate.date
          .toISOString()
          .slice(0, 10)
          .split("-")
          .reverse()
          .join("/");
        return {
          message:
            "A Hora: " + restrictionHour + " em " + data + " já cadastrada.",
        };
      }

      const addHour = await prismaClient.restrictionHour.create({
        data: {
          restrictionDate_id: restriction_id,
          hour: restrictionHour,
        },
        select: {
          restrictionDate: {
            select: {
              date: true,
            },
          },
          hour: true,
        },
      });

      return { addHour };
    }

    async function findRestriction(therapist_id, dataAgenda) {
      const restriction = await prismaClient.restrictionDate.findFirst({
        where: {
          therapist_id: therapist_id,
          AND: {
            date: dataAgenda,
          },
        },
        select: {
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              role: true,
            },
          },
          date: true,
          restrictionHour: true,
        },
      });

      if (restriction) {
        return restriction.id;
      } else {
        return null;
      }
    }

    async function createRestriction(therapist_id, dataAgenda) {
      const createRestriction = await prismaClient.restrictionDate.create({
        data: {
          therapist_id: therapist_id,
          date: dataAgenda,
        },
        select: {
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              role: true,
            },
          },
          date: true,
        },
      });
      return { createRestriction };
    }

    try {
      if (restrictionHour === "") {
        const restrictionExist = await findRestriction(
          therapist_id,
          dataAgenda
        );
        if (restrictionExist === null) {
          const restriction = await createRestriction(therapist_id, dataAgenda);
          return { restriction }
        } else {
          return { message: "Restrição da data já existe." };
        }
      } else {
        const existeHoraBanco: boolean = await existHour(restrictionHour);

        if (existeHoraBanco) {
          const existRestriction_id: string = await findRestriction(
            therapist_id,
            dataAgenda
          );

          if (existRestriction_id === null) {
            await createRestriction(therapist_id, dataAgenda);

            const restriction_id: string = await findRestriction(
              therapist_id,
              dataAgenda
            );

            return await addHour(restriction_id, restrictionHour);
          } else {
            const restriction_id: string = await findRestriction(
              therapist_id,
              dataAgenda
            );
            return await addHour(restriction_id, restrictionHour);
          }
        } else {
          return { message: "Hora inválida." };
        }
      }
    } catch (err) {
      throw new Error("Erro ao inserir restrição" + err);
    }
  }
}

export { CreateRestrictionDateService };
