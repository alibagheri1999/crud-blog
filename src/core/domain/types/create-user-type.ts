import { Role } from '../../../shared/utils/guard/roles';

export type CreateUserType = {
  email: string;
  user_name: string;
  firebase_uid: string;
  role: Role;
};
