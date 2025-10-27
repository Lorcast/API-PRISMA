import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) { }

    // Criar um novo post
    async create(data: { title: string; content: string; authorId: number }) {
        return this.prisma.post.create({
            data,
        });
    }

    // Buscar todos os posts, com filtros opcionais
    async findAll(authorId?: string, date?: string) {
        return this.prisma.post.findMany({
            where: {
                authorId: authorId ? Number(authorId) : undefined,
                createdAt: date
                    ? {
                        gte: new Date(`${date}T00:00:00`),
                        lt: new Date(`${date}T23:59:59`),
                    }
                    : undefined,
            },
            include: {
               
                        author: true,
                 
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    // Buscar um post pelo ID
    async findOne(id: number) {
        return this.prisma.post.findUnique({
            where: { id },
            include: {

                author: true,


            },
        });
    }

    // Atualizar título ou conteúdo
    async update(id: number, data: { title?: string; content?: string }) {
        return this.prisma.post.update({
            where: { id },
            data,
        });
    }

    // Deletar post
    async remove(id: number) {
        return this.prisma.post.delete({
            where: { id },
        });
    }
}