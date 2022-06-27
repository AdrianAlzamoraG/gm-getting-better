import { OfferTypeORM } from '../../infrastructure/persistence/typeorm/entities/offerTypeORM';
import { Offer } from '../../domain/entities/offer.entity';
import { OfferTitleTypeorm } from '../../infrastructure/persistence/typeorm/value-objects/offer-title.typeorm';
import { CoachIdTypeorm } from '../../infrastructure/persistence/typeorm/value-objects/coach-id.typeorm';
import { BalanceTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/balance.typeorm';
import { AuditTrailTypeORM } from '../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';

export class OfferMapper {
  public static toTypeORM(offer: Offer): OfferTypeORM {
    const offerTypeORM: OfferTypeORM = new OfferTypeORM();
    offerTypeORM.id = offer.getId() != null ? offer.getId().getValue() : 0;
    offerTypeORM.title =
      offer.getTitle() != null
        ? OfferTitleTypeorm.from(offer.getTitle().getValue())
        : null;
    offerTypeORM.balance =
      offer.getBalance() != null
        ? BalanceTypeORM.from(
            offer.getBalance().getAmount(),
            offer.getBalance().getCurrency(),
          )
        : null;
    offerTypeORM.coachId =
      offer.getCoachId() != null
        ? CoachIdTypeorm.from(offer.getCoachId().getValue())
        : null;
    offerTypeORM.auditTrail =
      offer.getAuditTrail() != null
        ? AuditTrailTypeORM.from(
            offer.getAuditTrail().getCreatedAt().format(),
            offer.getAuditTrail().getCreatedBy().getValue(),
            offer.getAuditTrail().getUpdatedAt().format(),
            offer.getAuditTrail().getUpdatedBy().getValue(),
          )
        : null;
    return offerTypeORM;
  }
}
