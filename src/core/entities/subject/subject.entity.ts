import { Address } from './address.entity';
import { HealthCondition } from './health-condition/health-condition.entity';

export class Subject {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
  healthConditions: HealthCondition[];
  // healthCondition: HealthCondition;
}
