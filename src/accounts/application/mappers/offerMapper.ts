import { OfferTypeORM } from '../../infrastructure/persistence/typeorm/entities/offerTypeORM';
import { Offer } from '../../domain/entities/offer.entity';
import { OfferTitleTypeorm } from '../../infrastructure/persistence/typeorm/value-objects/offer-title.typeorm';
import { CoachIdTypeorm } from '../../infrastructure/persistence/typeorm/value-objects/coach-id.typeorm';
import { BalanceTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/balance.typeorm';
import { AuditTrailTypeORM } from '../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';

export class OfferMapper {
  public static toTypeORM(account: Offer): OfferTypeORM {
    const offerTypeORM: OfferTypeORM = new OfferTypeORM();
    offerTypeORM.id = account.getId() != null ? account.getId().getValue() : 0;
    offerTypeORM.title =
      account.getTitle() != null
        ? OfferTitleTypeorm.from(account.getTitle().getValue())
        : null;
    offerTypeORM.balance =
      account.getBalance() != null
        ? BalanceTypeORM.from(
            account.getBalance().getAmount(),
            account.getBalance().getCurrency(),
          )
        : null;
    offerTypeORM.coachId =
      account.getCoachId() != null
        ? CoachIdTypeorm.from(account.getCoachId().getValue())
        : null;
    offerTypeORM.auditTrail =
      account.getAuditTrail() != null
        ? AuditTrailTypeORM.from(
            account.getAuditTrail().getCreatedAt().format(),
            account.getAuditTrail().getCreatedBy().getValue(),
            account.getAuditTrail().getUpdatedAt().format(),
            account.getAuditTrail().getUpdatedBy().getValue(),
          )
        : null;
    return offerTypeORM;
  }
}
