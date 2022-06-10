import { Offer } from "src/offer/domain/entities/offer.entity";
import { OfferTypeORM } from "src/offer/infrastructure/persistence/typeorm/entities/offer.typeorm";
import { OfferIdTypeORM } from "src/offer/infrastructure/persistence/typeorm/value-objects/offer-id.typeorm";



export class OfferMapper {
    public static toTypeORM(offer: Offer): OfferTypeORM {
      const offerIdTypeORM: OfferTypeORM = new OfferTypeORM();
  
      offerIdTypeORM.id = OfferIdTypeORM.from(
        offer.getId().getValue(),
      );
  
      offerIdTypeORM.title = offer.getTitle();
      offerIdTypeORM.description=offer.getDescription();
      offerIdTypeORM.pricePerIndividualSession=offer.getPricePerIndividualSession();
      offerIdTypeORM.pricePerGroupSession=offer.getPricePerGroupSession();
      offerIdTypeORM.typeMoney=offer.getTypeMoney();
      offerIdTypeORM.coachId=offer.getCoachId();
      offerIdTypeORM.statusPublication=offer.getStatusPublication();
      offerIdTypeORM.createdAt = offer.getCreatedAt();
  
      return offerIdTypeORM;
    }
  }