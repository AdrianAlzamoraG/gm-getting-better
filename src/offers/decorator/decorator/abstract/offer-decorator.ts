import { Offer } from '../../component/abstract/offer';

export class OfferDecorator extends Offer {
  protected offer: Offer; // Component

  constructor(offer: Offer) {
    super();
    this.offer = offer;
  }

  public getDescription(): string {
    return this.offer.getDescription();
  }

  public calculateCost(): number {
    return this.offer.calculateCost();
  }
}
