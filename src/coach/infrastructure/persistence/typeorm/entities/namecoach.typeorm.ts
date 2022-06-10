import { Column } from 'typeorm';

export class NameCoachTypeORM {
  @Column('varchar', { name: 'name_coach', length: 30, nullable: false })
  public nameCoach: string;

  private constructor(nameCoach: string) {
    this.nameCoach = nameCoach;
  }

  public static from(nameCoach: string): NameCoachTypeORM {
    return new NameCoachTypeORM(nameCoach);
  }
}