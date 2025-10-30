import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll(authorId?: number, date?: string) {
    // Filtro dinâmico
    const where: any = {};
    if (authorId) where.authorId = Number(authorId);
    if (date) {
      where.publishedAt = {
        gte: new Date(date),
        lt: new Date(`${date}T23:59:59`),
      };
    }

    return this.prisma.post.findMany({
      where,
      include: { author: true },
    });
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
      include: { author: true },
    });
  }

  create(data: { title: string; content: string; authorId: number }) {
    return this.prisma.post.create({ data });
  }

  update(
    id: number,
    data: { title?: string; content?: string; authorId?: number },
  ) {
    return this.prisma.post.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
