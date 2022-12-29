import { Test, TestingModule } from '@nestjs/testing';
import { GamePlayersController } from './game-players.controller';
import { GamePlayersService } from './game-players.service';

describe('GamePlayersController', () => {
  let controller: GamePlayersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamePlayersController],
      providers: [GamePlayersService],
    }).compile();

    controller = module.get<GamePlayersController>(GamePlayersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
