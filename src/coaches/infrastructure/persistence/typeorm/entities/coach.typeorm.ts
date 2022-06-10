import { Column, Entity, Unique } from 'typeorm';
import { CoachIdTypeORM } from './coach.id.typeorm';
import { NameCoachTypeORM } from './namecoach.typeorm';
import { EmailTypeORM } from 'src/common/infrastructure/persistence/typeorm/entities/email.typeorm';
import { PasswordTypeORM } from 'src/common/infrastructure/persistence/typeorm/entities/password.typeorm';

@Entity('companies')
@Unique('UQ_company', ['email.value'])
export class CompanyTypeORM {
  @Column((type) => CoachIdTypeORM, { prefix: false })
  public id: CoachIdTypeORM;

  @Column((type) => NameCoachTypeORM, { prefix: false })
  public nameCompany: NameCoachTypeORM;

  @Column((type) => EmailTypeORM, { prefix: false })
  public email: EmailTypeORM;

  @Column((type) => PasswordTypeORM, { prefix: false })
  public password: PasswordTypeORM;

  @Column('varchar', { name: 'description_company', length: 500, nullable: false })
  public descriptionCompany: string;

  @Column('varchar', { name: 'img_company', length: 500, nullable: false })
  public imgCompany: string;
}