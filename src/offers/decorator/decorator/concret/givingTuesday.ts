import { OfferDecorator } from '../abstract/offer-decorator';
import { Offer } from '../../component/abstract/offer';

export class GivingTuesday extends OfferDecorator {
  constructor(offer: Offer) {
    super(offer);
    this.description = 'GivingTuesday (-$10.50)';
  }

  public getDescription(): string {
    return this.offer.getDescription() + ', ' + this.description;
  }

  public calculateCost(): number {
    return this.offer.calculateCost() - 10.5;
  }
}
