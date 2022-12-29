import { Module } from '@nestjs/common';
import { GamePlayersService } from './game-players.service';
import { GamePlayersController } from './game-players.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamePlayer } from './entities/game-player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GamePlayer])],
  controllers: [GamePlayersController],
  providers: [GamePlayersService],
  exports: [TypeOrmModule, GamePlayersService],
})
export class GamePlayersModule {}
