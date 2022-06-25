import { Column, Unique } from 'typeorm';

export class OfferTitleTypeorm {
  @Column('varchar', { name: 'title', length: 150, nullable: false })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): OfferTitleTypeorm {
    return new OfferTitleTypeorm(value);
  }
}
