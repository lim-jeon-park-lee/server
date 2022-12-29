import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { databaseSetting } from './data-source';
import { ConfigModule } from '@nestjs/config';
import { LocationsModule } from './locations/locations.module';
import { GamesModule } from './games/games.module';
import { GamePlayersModule } from './game-players/game-players.module';
import { ChallengesModule } from './challenges/challenges.module';
import { StatusController } from './status/status.controller';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseSetting),
    UsersModule,
    AuthModule,
    LocationsModule,
    GamesModule,
    GamePlayersModule,
    ChallengesModule,
    StatusModule,
  ],
  controllers: [AppController, StatusController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
