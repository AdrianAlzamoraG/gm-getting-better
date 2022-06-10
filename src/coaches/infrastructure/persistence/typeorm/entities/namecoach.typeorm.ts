import { Column } from 'typeorm';

export class NameCoachTypeORM {
  @Column('varchar', { name: 'name_company', length: 30, nullable: false })
  public nameCoach: string;

  private constructor(nameCoach: string) {
    this.nameCoach = nameCoach;
  }

  public static from(nameCompany: string): NameCoachTypeORM {
    return new NameCoachTypeORM(nameCompany);
  }
}