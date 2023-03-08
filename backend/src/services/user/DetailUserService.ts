import prismaClient from "../../prisma";

class DetailUserService{
    async execute(){
        return {Ok: true}
    }
}

export { DetailUserService }