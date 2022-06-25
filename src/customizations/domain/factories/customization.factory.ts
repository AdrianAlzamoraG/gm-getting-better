import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { CustomizationType } from '../enums/customization-type.enum';
import { CustomizationStatus } from '../enums/customization.status.enum';
import { OfferId } from '../../../offers/domain/value-objects/offer-id.value';
import { Customization } from '../entities/customization.entity';
import { Money } from '../../../common/domain/value-objects/money.value';

export class CustomizationFactory {
  public static createFrom(
    type: CustomizationType,
    status: CustomizationStatus,
    accountIdFrom: OfferId,
    accountIdTo: OfferId,
    amount: Money,
    auditTrail: AuditTrail,
  ): Customization {
    return new Customization(
      type,
      status,
      accountIdFrom,
      accountIdTo,
      amount,
      auditTrail,
    );
  }
}
