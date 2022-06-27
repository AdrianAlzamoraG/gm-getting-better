import { Offer } from './component/abstract/offer';
import { BlackFriday } from './decorator/concret/blackFriday';
import { CyberMonday } from './decorator/concret/cyberMonday';
import { GivingTuesday } from './decorator/concret/givingTuesday';
import { OfferFactory } from './factory/offer-factory';
import { OfferType } from './factory/offer-type';

function clientCode() {
  let offer: Offer = OfferFactory.getType(OfferType.DUE);
  offer = new CyberMonday(offer);
  //offer = new GivingTuesday(offer);
  console.log(offer.getDescription());
  console.log(offer.calculateCost());
}

clientCode();
