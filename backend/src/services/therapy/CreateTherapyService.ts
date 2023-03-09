import prismaClient from "../../prisma";

interface TherapyRequest{
    name: string;
}

class CreateTherapyService{
    async execute({ name }: TherapyRequest){
        if(name === ''){
            throw new Error('Terapia inválida')
        }

        const therapy = await prismaClient.therapy.create({
            data:{
                name: name,
            },
            select:{
                id: true,
                name: true,
            }
    })

    return therapy;
}
}

export { CreateTherapyService }