import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppDataSource, databaseSetting } from '../data-source';
import { User } from '../users/entities/user.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
  ) {}

  create(userId: number, createLocationDto: CreateLocationDto) {
    try {
      const { lat, lng } = createLocationDto;
      return this.locationsRepository.save({
        userId,
        latitude: lat,
        longitude: lng,
      });
    } catch (e) {
      return e;
    }
  }

  async findAll() {
    await AppDataSource.initialize();
    const manager = AppDataSource.createEntityManager();
    const latestLocationOfUsers: any[] = await manager.query(`SELECT l.*
      FROM location l
      JOIN (
        SELECT userId, MAX(createdAt) AS max_createdAt
        FROM location
        GROUP BY userId
      ) lm ON l.userId = lm.userId AND l.createdAt = lm.max_createdAt
      `);
    const result = [];
    for (const location of latestLocationOfUsers) {
      const user = await AppDataSource.getRepository(User).findOneBy({
        id: location.userId,
      });
      result.push({ ...location, user });
    }
    AppDataSource.destroy();
    return result;
  }

  findOne(id: number) {
    return this.locationsRepository.findOneBy({ id });
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
