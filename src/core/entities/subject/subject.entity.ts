import { HealthCondition } from './health-condition/health-condition.entity';
import { GeneralInfo } from './general-info/general-info.entity';
import { FunctionAbility } from './function-ability/function-ability.entity';
import { Address } from './address.entity';
import { Note } from './note.entity';

export class Subject {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
  generalInformation: GeneralInfo[] = [];
  healthConditions: HealthCondition[] = [];
  functionAbilities: FunctionAbility[] = [];
  // notes: Note[] = [];
}
