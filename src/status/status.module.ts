import { Module } from '@nestjs/common';
import { ChallengesModule } from '../challenges/challenges.module';
import { GamePlayersModule } from '../game-players/game-players.module';
import { GamesModule } from '../games/games.module';
import { UsersModule } from '../users/users.module';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';

@Module({
  imports: [UsersModule, ChallengesModule, GamesModule, GamePlayersModule],
  controllers: [StatusController],
  providers: [StatusService],
  exports: [StatusService],
})
export class StatusModule {}
