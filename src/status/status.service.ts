import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Challenge } from '../challenges/entities/challenge.entity';
import { GamePlayer } from '../game-players/entities/game-player.entity';
import { Game } from '../games/entities/game.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Challenge)
    private challengesRepository: Repository<Challenge>,
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
    @InjectRepository(GamePlayer)
    private gamePlayersRepository: Repository<GamePlayer>,
  ) {}

  async getUserStatusOfUser(userId: number) {
    // 유저의 초대장 정보, 게임 참여 정보 리턴
    const sentChallenges = await this.challengesRepository.findBy({
      hostUserId: userId,
    });
    const receivedChallenges = await this.challengesRepository.find({
      where: {
        invitedUserId: userId,
      },
    });
    // TODO. 만료
    const currentPlayingGame = await this.gamePlayersRepository
      .createQueryBuilder('gamePlayer')
      .leftJoinAndSelect('gamePlayer.game', 'game')
      .where('game.endAt IS NULL')
      .andWhere('userId = :userId', { userId })
      .orderBy('createdAt', 'DESC')
      .getOne();
    const lastPlayedGame = await this.gamePlayersRepository
      .createQueryBuilder('gamePlayer')
      .leftJoinAndSelect('gamePlayer.game', 'game')
      .where('game.endAt IS NOT NULL')
      .andWhere('userId = :userId', { userId })
      .orderBy('createdAt', 'DESC')
      .getOne();
    console.log(currentPlayingGame, lastPlayedGame);

    return {
      sentChallenges,
      receivedChallenges,
      currentPlayingGame: !!currentPlayingGame
        ? await this.gamesRepository.findOne({
            where: { id: currentPlayingGame.game.id },
            relations: { players: true },
          })
        : null,
      lastPlayedGame: !!lastPlayedGame
        ? await this.gamesRepository.findOne({
            where: { id: lastPlayedGame.game.id },
            relations: { players: true },
          })
        : null,
    };
  }
}
