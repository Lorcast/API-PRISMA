// src/app.module.ts
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthorsModule } from './authors/authors.module';
import { PostsModule } from './posts/posts.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [UsersModule, AuthorsModule, PostsModule, FavoritesModule],
})
export class AppModule {}
