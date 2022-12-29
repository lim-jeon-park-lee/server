import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from '../games/entities/game.entity';
import { User } from './entities/user.entity';
import { UserCreateDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Game) private gamesRepository: Repository<Game>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async create(userCreateDto: UserCreateDto) {
    return this.usersRepository.save(userCreateDto);
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { locations: true },
    });
    // const gameHistories = await this.gamesRepository
    //   .createQueryBuilder('game')
    //   .leftJoinAndSelect(
    //     'game.players',
    //     'players',
    //     'players.userId = :userId',
    //     { userId: id },
    //   )
    //   .getMany();
    return {
      ...user,
      // gameHistories: gameHistories.map(history => history.),
    };
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
