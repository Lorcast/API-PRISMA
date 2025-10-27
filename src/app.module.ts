import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostsModule } from './posts/posts.module';
import { AuthorsModule } from './authors/authors.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [PrismaModule, UsersModule, PostsModule, AuthorsModule, FavoritesModule],
})
export class AppModule {}


