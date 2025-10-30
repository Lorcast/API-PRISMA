import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoritesService.findOne(Number(id));
  }

  @Post()
  create(@Body() data: { userId: number; postId: number }) {
    return this.favoritesService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: { userId?: number; postId?: number }) {
    return this.favoritesService.update(Number(id), data);
  }
}
