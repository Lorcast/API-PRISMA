import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  create(data: { userId: number; postId: number }) {
    return this.prisma.favorite.create({ data });
  }

  findAll() {
    return this.prisma.favorite.findMany({
      include: { user: true, post: true },
    });
  }

  remove(id: number) {
    return this.prisma.favorite.delete({ where: { id } });
  }
}