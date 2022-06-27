import { OfferDecorator } from '../abstract/offer-decorator';
import { Offer } from '../../component/abstract/offer';

export class CyberMonday extends OfferDecorator {
  constructor(offer: Offer) {
    super(offer);
    this.description = 'CyberMonday ($15.00)';
  }

  public getDescription(): string {
    return this.offer.getDescription() + ', ' + this.description;
  }

  public calculateCost(): number {
    return this.offer.calculateCost() - 15.0;
  }
}
