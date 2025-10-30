import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  findAll(@Query('authorId') authorId?: string, @Query('date') date?: string) {
    return this.postsService.findAll(authorId ? Number(authorId) : undefined, date);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(Number(id));
  }

  @Post()
  create(@Body() data: { title: string; content: string; authorId: number }) {
    return this.postsService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: { title?: string; content?: string; authorId?: number }) {
    return this.postsService.update(Number(id), data);
  }
}
