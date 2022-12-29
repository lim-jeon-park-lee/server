import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GamePlayer } from '../game-players/entities/game-player.entity';
import { Game } from '../games/entities/game.entity';
import { Challenge } from './entities/challenge.entity';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challenge)
    private challengesRepository: Repository<Challenge>,
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
    @InjectRepository(GamePlayer)
    private gamePlayersRepository: Repository<GamePlayer>,
  ) {}

  create(hostUserId, invitedUserId) {
    if (hostUserId === invitedUserId)
      throw new BadRequestException(
        '자기 자신에게 도전할 수 없습니다. 자신에 대한 도전은 헬스장에서...',
      );
    return this.challengesRepository.save({
      hostUserId,
      invitedUserId,
    });
  }

  findAll() {
    return this.challengesRepository.find();
  }

  findOne(id: number) {
    return this.challengesRepository.findOneBy({ id });
  }

  async accept(id: number) {
    const challenge = await this.findOne(id);
    // TODO.진행중인 게임이 있는지 확인

    // accept
    await this.challengesRepository.update(id, {
      accepted: true,
    });
    // create game
    const newGame = await this.gamesRepository.save({
      challengeId: id,
    });
    // create game player
    await this.gamePlayersRepository.save({
      gameId: newGame.id,
      userId: challenge.hostUserId,
    });
    await this.gamePlayersRepository.save({
      gameId: newGame.id,
      userId: challenge.invitedUserId,
    });
    return true;
  }
}
