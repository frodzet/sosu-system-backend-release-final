import { HealthConditionItem } from './health-condition-item.entity';

export class HealthCondition {
  title: string;
  healthConditionItems: HealthConditionItem[] = [];
}
