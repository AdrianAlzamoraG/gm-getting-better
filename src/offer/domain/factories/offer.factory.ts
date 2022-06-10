import { Offer } from '../entities/offer.entity';
import { OfferId } from '../value-objects/offer-id.value';

export class OfferFactory {
  public static createFrom(
    title: string,
    description: string,
    pricePerIndividualSession: number,
    pricePerGroupSession: number,
    typeMoney: string,
    coachId: number,
    statusPublication: boolean,
    createdAt: string,
  ): Offer {
    return new Offer(
      OfferId.create(0),
      title,
      description,
      pricePerIndividualSession,
      pricePerGroupSession,
      typeMoney,
      coachId,
      statusPublication,
      createdAt,
    );
  }
  public static withId(
    OfferId: OfferId,
    title: string,
    description: string,
    pricePerIndividualSession: number,
    pricePerGroupSession: number,
    typeMoney: string,
    coachId: number,
    statusPublication: boolean,
    createdAt: string,
  ): Offer {
    return new Offer(
      OfferId,
      title,
      description,
      pricePerIndividualSession,
      pricePerGroupSession,
      typeMoney,
      coachId,
      statusPublication,
      createdAt,
    );
  }
}
