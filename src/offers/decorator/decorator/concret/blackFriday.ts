import { OfferDecorator } from '../abstract/offer-decorator';
import { Offer } from '../../component/abstract/offer';

export class BlackFriday extends OfferDecorator {
  constructor(offer: Offer) {
    super(offer);
    this.description = 'BlackFriday (-$20.25)';
  }

  public getDescription(): string {
    return this.offer.getDescription() + ', ' + this.description;
  }

  public calculateCost(): number {
    return this.offer.calculateCost() - 20.25;
  }
}
