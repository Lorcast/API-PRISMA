import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AuthorsService } from './authors.service';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(Number(id));
  }

  // Criar autor com usuário novo
  @Post('create-with-user')
  createWithNewUser(@Body() body: { name: string; email: string; bio?: string }) {
    return this.authorsService.createWithNewUser(body);
  }

  // Criar autor com usuário já existente
  @Post('create-with-existing-user')
  createWithExistingUser(@Body() body: { userId: number; bio?: string }) {
    return this.authorsService.createWithExistingUser(body.userId, body.bio);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { bio: string }) {
    return this.authorsService.update(Number(id), body.bio);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorsService.remove(Number(id));
  }
}
