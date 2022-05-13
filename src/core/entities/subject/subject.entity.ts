import { Address } from './address.entity';
import { HealthCondition } from './health-condition/health-condition.entity';
import { GeneralInfo } from './general-info/general-info.entity';

export class Subject {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
  generalInformation: GeneralInfo[];
  healthConditions: HealthCondition[];
  // healthCondition: HealthCondition;
}
