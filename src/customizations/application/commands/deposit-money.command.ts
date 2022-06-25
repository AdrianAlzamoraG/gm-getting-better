import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { CustomizationStatus } from '../../domain/enums/customization.status.enum';

export class SaveCost {
  constructor(
    public readonly accountNumber: string,
    public readonly amount: number,
    public readonly status: CustomizationStatus,
    public readonly createdAt: DateTime,
  ) {}
}
