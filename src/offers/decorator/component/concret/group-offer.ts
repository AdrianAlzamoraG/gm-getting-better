import { Offer } from '../abstract/offer';

export class GroupOffer extends Offer {
  constructor() {
    super();
    this.description = 'Group Offer (190.00)';
  }

  public getDescription(): string {
    return this.description;
  }

  public calculateCost(): number {
    return 190.0;
  }
}
