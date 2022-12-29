import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { GamesModule } from '../games/games.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), GamesModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
