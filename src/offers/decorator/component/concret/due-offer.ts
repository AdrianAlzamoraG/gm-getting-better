import { Offer } from '../abstract/offer';

export class DueOffer extends Offer {
  constructor() {
    super();
    this.description = 'Dual Offer (120.00)';
  }

  public getDescription(): string {
    return this.description;
  }

  public calculateCost(): number {
    return 120.0;
  }
}
