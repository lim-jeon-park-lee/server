import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { GamePlayersModule } from '../game-players/game-players.module';

@Module({
  imports: [TypeOrmModule.forFeature([Game]), GamePlayersModule],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [TypeOrmModule, GamesService],
})
export class GamesModule {}
