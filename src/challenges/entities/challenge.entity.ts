import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from '../../games/entities/game.entity';

@Entity()
export class Challenge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hostUserId: number;

  @Column()
  invitedUserId: number;

  @Column({ default: false })
  accepted: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @OneToOne((type) => Game, (game) => game.challenge)
  game: Game;
}
