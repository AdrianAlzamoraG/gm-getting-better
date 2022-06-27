import { Column } from 'typeorm';

export class CoachIdTypeorm {
  @Column('bigint', { name: 'coach_id', unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static from(value: number): CoachIdTypeorm {
    return new CoachIdTypeorm(value);
  }
}
