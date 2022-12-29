import { Injectable } from '@nestjs/common';
import { CreateGamePlayerDto } from './dto/create-game-player.dto';
import { UpdateGamePlayerDto } from './dto/update-game-player.dto';

@Injectable()
export class GamePlayersService {
  create(createGamePlayerDto: CreateGamePlayerDto) {
    return 'This action adds a new gamePlayer';
  }

  findAll() {
    return `This action returns all gamePlayers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gamePlayer`;
  }

  update(id: number, updateGamePlayerDto: UpdateGamePlayerDto) {
    return `This action updates a #${id} gamePlayer`;
  }

  remove(id: number) {
    return `This action removes a #${id} gamePlayer`;
  }
}
