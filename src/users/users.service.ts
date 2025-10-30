import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Lista todos os usuários
  findAll() {
    return this.prisma.user.findMany({
      include: {
        author: true,
        favorites: {
          include: { post: true },
        },
      },
    });
  }

  // Busca um usuário pelo ID
  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        author: true,
        favorites: {
          include: { post: true },
        },
      },
    });
  }

  // Cria um novo usuário
  async create(data: { name: string; email: string; bio?: string }) {
    // Verifica se o email já existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new Error('Este email já está em uso por outro usuário.');
    }

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
      },
    });

    // Se houver bio, cria também o registro no Author
    if (data.bio) {
      await this.prisma.author.create({
        data: { userId: user.id, bio: data.bio },
      });
    }

    return user;
  }

  // Atualiza um usuário existente
  async update(
    id: number,
    data: { name?: string; email?: string; bio?: string },
  ) {
    const { bio, email, name } = data;
    const userData: Prisma.UserUpdateInput = {};

    if (name) userData.name = name;

    // Valida e atualiza email
    if (email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });
      if (existingUser && existingUser.id !== id) {
        throw new Error('Este email já está em uso por outro usuário.');
      }
      userData.email = email;
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: userData,
    });

    // Atualiza bio (Author)
    if (bio) {
      const author = await this.prisma.author.findUnique({
        where: { userId: id },
      });

      if (author) {
        await this.prisma.author.update({
          where: { userId: id },
          data: { bio },
        });
      } else {
        // cria se ainda não existir
        await this.prisma.author.create({
          data: { userId: id, bio },
        });
      }
    }

    return user;
  }

  // Adiciona um post aos favoritos do usuário
  async addFavorite(userId: number, postId: number) {
    return this.prisma.favorite.create({
      data: { userId, postId },
    });
  }

  // Lista os posts favoritos de um usuário
  async getFavorites(userId: number) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: { post: true },
    });
  }
}
