import { CustomizationStatus } from '../enums/customization.status.enum';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';

export class CostSaved {
  constructor(
    public readonly customizationId: number,
    public readonly offerIdFrom: number,
    public readonly amount: number,
    public readonly status: CustomizationStatus,
    public readonly createdAt: DateTime,
  ) {}
}
