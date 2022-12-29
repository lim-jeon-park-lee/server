import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GamePlayersService } from './game-players.service';
import { CreateGamePlayerDto } from './dto/create-game-player.dto';
import { UpdateGamePlayerDto } from './dto/update-game-player.dto';

@Controller('game-players')
export class GamePlayersController {
  constructor(private readonly gamePlayersService: GamePlayersService) {}

  @Post()
  create(@Body() createGamePlayerDto: CreateGamePlayerDto) {
    return this.gamePlayersService.create(createGamePlayerDto);
  }

  @Get()
  findAll() {
    return this.gamePlayersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamePlayersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGamePlayerDto: UpdateGamePlayerDto) {
    return this.gamePlayersService.update(+id, updateGamePlayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamePlayersService.remove(+id);
  }
}
