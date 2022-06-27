import { OfferType } from './offer-type';
import { IndividualOffer } from '../component/concret/individual-offer';
import { Offer } from '../component/abstract/offer';
import { DueOffer } from '../component/concret/due-offer';
import { GroupOffer } from '../component/concret/group-offer';

export class OfferFactory {
  // Factory Method
  public static getType(offerType: OfferType): Offer {
    if (offerType == OfferType.INDIVIDUAL) {
      return new IndividualOffer();
    }
    if (offerType == OfferType.DUE) {
      return new DueOffer();
    }
    if (offerType == OfferType.GROUP) {
      return new GroupOffer();
    }
  }
}
