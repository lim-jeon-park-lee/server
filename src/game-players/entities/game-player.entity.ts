import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from '../../games/entities/game.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class GamePlayer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gameId: number;

  @Column()
  userId: number;

  @Column({ type: 'boolean', default: false })
  win: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @ManyToOne((type) => Game, (game) => game.players)
  game: Game;

  @ManyToOne((type) => User, (user) => user.gamePlayers)
  user: User;
}
