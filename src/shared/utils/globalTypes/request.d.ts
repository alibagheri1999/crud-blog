import { User } from '../../../core/domain/entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
