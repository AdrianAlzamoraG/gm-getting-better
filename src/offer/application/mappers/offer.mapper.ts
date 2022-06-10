import { Offer } from 'src/offer/domain/entities/offer.entity';
import { OfferTypeORM } from 'src/offer/infrastructure/persistence/typeorm/entities/offer.typeorm';
import { OfferIdTypeORM } from 'src/offer/infrastructure/persistence/typeorm/value-objects/offer-id.typeorm';

export class OfferMapper {
  public static toTypeORM(offer: Offer): OfferTypeORM {
    const offerTypeORM: OfferTypeORM = new OfferTypeORM();

    offerTypeORM.id = OfferIdTypeORM.from(offer.getId().getValue());

    offerTypeORM.title = offer.getTitle();
    offerTypeORM.description = offer.getDescription();
    offerTypeORM.pricePerIndividualSession =
      offer.getPricePerIndividualSession();
    offerTypeORM.pricePerGroupSession = offer.getPricePerGroupSession();
    offerTypeORM.typeMoney = offer.getTypeMoney();
    offerTypeORM.coachId = offer.getCoachId();
    offerTypeORM.statusPublication = offer.getStatusPublication();
    offerTypeORM.createdAt = offer.getCreatedAt();

    return offerTypeORM;
  }
}
