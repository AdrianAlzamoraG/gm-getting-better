import { CoachId } from '../../../coaches/domain/value-objects/coaches-id.value';
import { Money } from '../../../common/domain/value-objects/money.value';
import { Offer } from '../entities/offer.entity';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { OfferTitle } from '../value-objects/offer-title.value';
import { OfferId } from '../value-objects/offer-id.value';

export class OfferFactory {
  public static createFrom(
    title: OfferTitle,
    balance: Money,
    clientId: CoachId,
    auditTrail: AuditTrail,
  ): Offer {
    return new Offer(title, balance, clientId, auditTrail);
  }

  public static withId(
    offerId: OfferId,
    title: OfferTitle,
    balance: Money,
    clientId: CoachId,
    auditTrail: AuditTrail,
  ): Offer {
    const offer: Offer = new Offer(title, balance, clientId, auditTrail);
    offer.changeId(offerId);
    return offer;
  }
}
