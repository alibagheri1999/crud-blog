import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepositoryPort } from '../../../core/domain/ports/user-repository.port';
import { User } from '../../../core/domain/entities/user.entity';
import { CreateUserType } from '../../../core/domain/types/create-user-type';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findById(id: string): Promise<User | null> {
    return this.repository.findOne({ where: { firebase_uid: id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  create(user: CreateUserType): User {
    return this.repository.create(user);
  }
}
