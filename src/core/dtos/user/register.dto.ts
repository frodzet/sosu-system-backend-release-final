import { Role } from '../../../services/authentication/roles/roles.enum';

export class RegistrationDto {
  userName: string;
  password: string;
  roles: Role[];
}
