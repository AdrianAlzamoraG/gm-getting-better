import { Offer } from '../abstract/offer';

export class IndividualOffer extends Offer {
  constructor() {
    super();
    this.description = 'Individual Offer (100.00)';
  }

  public getDescription(): string {
    return this.description;
  }

  public calculateCost(): number {
    return 100.0;
  }
}
