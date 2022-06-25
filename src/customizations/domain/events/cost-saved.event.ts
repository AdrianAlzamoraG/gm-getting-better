import { CustomizationStatus } from '../enums/customization.status.enum';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';

export class CostSaved {
  constructor(
    public readonly transactionId: number,
    public readonly accountIdFrom: number,
    public readonly amount: number,
    public readonly status: CustomizationStatus,
    public readonly createdAt: DateTime,
  ) {}
}
