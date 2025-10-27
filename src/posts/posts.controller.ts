import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() body: { title: string; content: string; authorId: number }) {
    return this.postsService.create(body);
  }

  @Get()
  findAll(@Query('authorId') authorId?: string, @Query('date') date?: string) {
    return this.postsService.findAll(authorId, date);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { title?: string; content?: string }) {
    return this.postsService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}