import { Column, Entity, Unique } from 'typeorm';
import { CoachIdTypeORM } from './coach.id.typeorm';
import { NameCoachTypeORM } from './namecoach.typeorm';
import { EmailTypeORM } from 'src/common/infrastructure/persistence/typeorm/entities/email.typeorm';
import { PasswordTypeORM } from 'src/common/infrastructure/persistence/typeorm/entities/password.typeorm';

@Entity('coach')
@Unique('UQ_coach', ['email.value'])
export class CoachTypeORM {
  @Column((type) => CoachIdTypeORM, { prefix: false })
  public id: CoachIdTypeORM;

  @Column((type) => NameCoachTypeORM, { prefix: false })
  public nameCoach: NameCoachTypeORM;

  @Column((type) => EmailTypeORM, { prefix: false })
  public email: EmailTypeORM;

  @Column((type) => PasswordTypeORM, { prefix: false })
  public password: PasswordTypeORM;

  @Column('varchar', {
    name: 'description_coach',
    length: 500,
    nullable: false,
  })
  public descriptionCoach: string;

  @Column('varchar', { name: 'img_coach', length: 500, nullable: false })
  public imgCoach: string;
}
