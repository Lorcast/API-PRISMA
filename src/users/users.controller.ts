import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  @Post()
  create(@Body() body: { name: string; email: string; bio?: string }) {
    return this.usersService.create(body);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { name?: string; email?: string; bio?: string },
  ) {
    return this.usersService.update(Number(id), body);
  }

  // ✅ Adiciona post aos favoritos do usuário
  @Post(':id/favorites/:postId')
  addFavorite(
    @Param('id') id: string,
    @Param('postId') postId: string,
  ) {
    return this.usersService.addFavorite(Number(id), Number(postId));
  }

  // ✅ Lista favoritos do usuário
  @Get(':id/favorites')
  getFavorites(@Param('id') id: string) {
    return this.usersService.getFavorites(Number(id));
  }
}
