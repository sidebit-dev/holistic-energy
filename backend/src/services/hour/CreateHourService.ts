import prismaClient from "../../prisma";

interface HourRequest{
    hour: string;
}

class CreateHourService{
    async execute({ hour }: HourRequest){
        if(hour === ''){
            throw new Error('Hora inválida')
        }

        const hours = await prismaClient.hour.create({
            data:{
                hour: hour,
            },
            select:{
                id: true,
                hour: true,
            }
    })

    return hours;
}
}

export { CreateHourService }