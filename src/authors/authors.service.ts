// src/authors/authors.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.author.findMany({
      include: { user: true, posts: true },
    });
  }

  findOne(id: number) {
    return this.prisma.author.findUnique({
      where: { id },
      include: { user: true, posts: true },
    });
  }

  // Criar autor usando um usuário existente
  createWithExistingUser(userId: number, bio?: string) {
    return this.prisma.author.create({
      data: {
        bio,
        userId, // apenas userId, sem "user" direto
      },
      include: { user: true, posts: true },
    });
  }

  // Criar autor e usuário novo ao mesmo tempo ou conectar a um existente
  async createWithNewUser(data: { name: string; email: string; bio?: string }) {
    const { name, email, bio } = data;

    return this.prisma.author.create({
      data: {
        bio,
        user: {
          connectOrCreate: {
            where: { email },      // procura por email existente
            create: { name, email } // cria se não existir
          },
        },
      },
      include: { user: true, posts: true },
    });
  }

  update(id: number, bio: string) {
    return this.prisma.author.update({
      where: { id },
      data: { bio },
      include: { user: true, posts: true },
    });
  }

  remove(id: number) {
    return this.prisma.author.delete({
      where: { id },
      include: { user: true, posts: true },
    });
  }
}
