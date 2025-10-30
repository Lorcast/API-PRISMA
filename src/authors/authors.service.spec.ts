import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; bio?: string }) {
    return this.prisma.author.create({ data });
  }

  async findAll() {
    return this.prisma.author.findMany();
  }

  async findOne(id: number) {
    return this.prisma.author.findUnique({ where: { id } });
  }

  async update(id: number, data: { name?: string; bio?: string }) {
    return this.prisma.author.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.author.delete({ where: { id } });
  }
}
