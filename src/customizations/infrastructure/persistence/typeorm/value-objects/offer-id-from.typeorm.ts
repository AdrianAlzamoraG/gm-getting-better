import { Column } from 'typeorm';

export class OfferIdFromTypeorm {
  @Column('bigint', { name: 'from_offer_id', unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static from(value: number): OfferIdFromTypeorm {
    return new OfferIdFromTypeorm(value);
  }
}
