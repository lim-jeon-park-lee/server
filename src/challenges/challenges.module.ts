import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengesController } from './challenges.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from './entities/challenge.entity';
import { GamesModule } from '../games/games.module';
import { GamePlayersModule } from '../game-players/game-players.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Challenge]),
    GamesModule,
    GamePlayersModule,
  ],
  controllers: [ChallengesController],
  providers: [ChallengesService],
  exports: [TypeOrmModule, ChallengesService],
})
export class ChallengesModule {}
