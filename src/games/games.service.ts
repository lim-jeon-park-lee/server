import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'date-fns';
import { Repository } from 'typeorm';
import { GamePlayer } from '../game-players/entities/game-player.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
    @InjectRepository(GamePlayer)
    private gamePlayersRepository: Repository<GamePlayer>,
  ) {}

  create(createGameDto: CreateGameDto) {
    return 'This action adds a new game';
  }

  findAll() {
    return `This action returns all games`;
  }

  findOne(id: number) {
    return this.gamesRepository.findOneBy({ id });
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }

  async won(gameId: number, userId: number) {
    // check game is valid
    const game = await this.findOne(gameId);
    if (game.endAt !== null) throw new BadRequestException();
    // update winner
    await this.gamePlayersRepository.update(
      {
        gameId,
        userId,
      },
      {
        win: true,
      },
    );
    // close game
    await this.gamesRepository.update(gameId, {
      endAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    });
    return true;
  }
}
