import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GamePlayer } from '../../game-players/entities/game-player.entity';
import { Location } from '../../locations/entities/location.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @OneToMany((type) => Location, (location) => location.user)
  locations: Location[];

  @OneToMany((type) => GamePlayer, (gamePlayer) => gamePlayer.user)
  gamePlayers: GamePlayer[];
}
