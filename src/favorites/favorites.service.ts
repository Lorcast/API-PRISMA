// src/favorites/favorites.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.favorite.findMany({ include: { post: true, user: true } });
  }

  findOne(id: number) {
    return this.prisma.favorite.findUnique({ where: { id }, include: { post: true, user: true } });
  }

  create(data: { userId: number; postId: number }) {
    return this.prisma.favorite.create({ data });
  }

  update(id: number, data: { userId?: number; postId?: number }) {
    return this.prisma.favorite.update({ where: { id }, data });
  }
}
