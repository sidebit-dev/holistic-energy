import { Client, PrismaClient, Role } from "@prisma/client";
import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
  name: string;
  email: string;
  password: string;
  role: Role;
}

interface ClientRequest {
  user_id: string;
  birthday: Date;
}

class CreateUserService {
  async excute({ name, email, password, role }: UserRequest) {
    // Verificar se ele enviou um email
    if (!email) {
      throw new Error("Email incorreto");
    }

    // Verificar se é o primeiro usuário a cadastrar, se for será ADMIN
    const countUser = await prismaClient.user.count();

    if (countUser === 0) {
      role = "ADMIN";
      const passwordHash = await hash(password, 8);

      const user = await prismaClient.user.create({
        data: {
          name: name,
          email: email,
          password: passwordHash,
          role: role,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });

      const admin = await prismaClient.admin.create({
        data: {
          id: user.id,
          typeAdmin: "MASTER",
        },
        select: {
          id: true,
          typeAdmin: true,
        },
      });

      return [user, admin];
    } else {
      // Verificar se o email já esta cadastrao na plataforma
      const userAlreadyExists = await prismaClient.user.findFirst({
        where: {
          email: email,
        },
      });

      if (userAlreadyExists) {
        throw new Error("Usuário já existe");
      }

      const passwordHash = await hash(password, 8);

      const user = await prismaClient.user.create({
        data: {
          name: name,
          email: email,
          password: passwordHash,
          role: role,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });

      const client = await prismaClient.client.create({
        data: {
          id: user.id,
        },
        select: {
          id: true,
        },
      });

      return [user, client];
    }
  }
}

export { CreateUserService };
