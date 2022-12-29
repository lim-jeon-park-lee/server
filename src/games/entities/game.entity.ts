import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Challenge } from '../../challenges/entities/challenge.entity';
import { GamePlayer } from '../../game-players/entities/game-player.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  challengeId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startAt: string;

  @Column({ type: 'timestamp', nullable: true })
  endAt: string;

  @OneToMany((type) => GamePlayer, (gamePlayer) => gamePlayer.game)
  players: GamePlayer[];

  @OneToOne((type) => Challenge, (challenge) => challenge.game)
  challenge: Challenge;
}
