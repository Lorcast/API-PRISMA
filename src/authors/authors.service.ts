import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  // Criar novo autor vinculado a um usuário
  async create(data: { userId: number; bio?: string }) {
    return this.prisma.authors.create({
      data,
    });
  }

  // Listar todos os autores
  async findAll() {
    return this.prisma.authors.findMany({
      include: { user: true, posts: true }, // traz o usuário e os posts do autor
    });
  }

  // Buscar um autor específico
  async findOne(id: number) {
    return this.prisma.authors.findUnique({
      where: { id },
      include: { user: true, posts: true },
    });
  }

  // Atualizar bio do autor (ou outro campo)
  async update(id: number, data: { bio?: string }) {
    return this.prisma.authors.update({
      where: { id },
      data,
    });
  }

  // Excluir autor (geralmente não obrigatório, mas deixamos aqui)
  async remove(id: number) {
    return this.prisma.authors.delete({
      where: { id },
    });
  }
}