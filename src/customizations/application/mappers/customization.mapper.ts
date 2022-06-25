import { Customization } from '../../domain/entities/customization.entity';
import { CustomizationTypeorm } from '../../infrastructure/persistence/typeorm/entities/customization.typeorm';
import { OfferIdFromTypeorm } from '../../infrastructure/persistence/typeorm/value-objects/offer-id-from.typeorm';
import { AmountTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/amount.typeorm';

export class CustomizationMapper {
  public static toTypeORM(customization: Customization): CustomizationTypeorm {
    const customizationTypeorm: CustomizationTypeorm =
      new CustomizationTypeorm();
    customizationTypeorm.type = customization.getType();
    customizationTypeorm.status = customization.getStatus();
    customizationTypeorm.accountIdFrom = OfferIdFromTypeorm.from(
      customization.getAccountFrom().getValue(),
    );
    customizationTypeorm.accountIdTo =
      customization.getAccountTo() != null
        ? OfferIdFromTypeorm.from(customization.getAccountTo().getValue())
        : null;
    customizationTypeorm.amount = AmountTypeORM.from(
      customization.getAmount().getAmount(),
      customization.getAmount().getCurrency(),
    );
    return customizationTypeorm;
  }
}
