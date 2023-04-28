import { Hour } from "@prisma/client";
import prismaClient from "../../prisma";

interface RestrictionRequest {
  id: string;
  restrictionHour: string;
}

class UpdateRestrictionDateService {
  async execute({ id, restrictionHour }: RestrictionRequest) {
    // console.log(id, restrictionHour)
    //  console.log(date);
    // const dataAgenda = new Date(date);

    const restriction = await prismaClient.restrictionDate.findFirst({
      where: {
        id: id,
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

    if (!restriction) {
      throw new Error("A restrição não existe.");
    }
    // const agenda = new Date(date.replace("-", "/"));
    // const corte = (restriction.restrictionDate).getDay()
    // console.log( agenda )

    // if(dataAgenda === restriction.restrictionDate){
    //     console.log("Passei aqui")
    // }

    if (restriction.restrictionHour !== null) {
      throw new Error("A restrição nesta data já existe.");
    }

    if (restrictionHour === "") {
      throw new Error("Restrição inválida.");
    }

       const upHour = await prismaClient.restrictionDate.update({
            where:{
                id: id,
            },
            data:{
                restrictionHour: restrictionHour,
            },
            select:{
                id: true,
                user:{
                  select:{
                    id: true,
                    name: true,
                    role: true,
                  }
                },
                date: true,
                restrictionHour: true
              }
        })

        return {restriction, upHour}

    }  
}

export { UpdateRestrictionDateService };
