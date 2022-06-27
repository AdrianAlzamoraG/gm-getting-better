import { Column } from 'typeorm';

export class OfferIdToTypeorm {
  @Column('bigint', { name: 'to_offer_id', nullable: true, unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static from(value: number): OfferIdToTypeorm {
    return new OfferIdToTypeorm(value);
  }
}
