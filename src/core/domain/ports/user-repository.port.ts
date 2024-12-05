import { CreateUserType } from '../types/create-user-type';
import { User } from '../entities/user.entity';

export interface UserRepositoryPort {
  findById(id: string): Promise<User | null>;
  findByEmail(id: string): Promise<User | null>;
  save(user: User): Promise<User>;
  create(user: CreateUserType): User;
}
