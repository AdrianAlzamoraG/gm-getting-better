import { Coach } from '../../domain/entities/coach.entity';
import { CoachTypeORM } from '../../infrastructure/persistence/typeorm/entities/coach.typeorm';
import { NameCoachTypeORM } from '../../infrastructure/persistence/typeorm/entities/namecoach.typeorm';
import { EmailTypeORM } from 'src/common/infrastructure/persistence/typeorm/entities/email.typeorm';
import { CoachIdTypeORM } from '../../infrastructure/persistence/typeorm/entities/coach.id.typeorm';
import { PasswordTypeORM } from 'src/common/infrastructure/persistence/typeorm/entities/password.typeorm';

export class CoachMapper {
  public static toTypeORM(coach: Coach): CoachTypeORM {
    const coachTypeORM: CoachTypeORM = new CoachTypeORM();

    coachTypeORM.id = CoachIdTypeORM.from(coach.getCoachId().getValue());
    coachTypeORM.nameCoach = NameCoachTypeORM.from(
      coach.getNameCoach().getNameCoach(),
    );
    coachTypeORM.email = EmailTypeORM.from(coach.getEmail().getValue());
    coachTypeORM.password = PasswordTypeORM.from(
      coach.getPassword().getValue(),
    );
    coachTypeORM.descriptionCoach = coach.getDescriptionCoach();
    coachTypeORM.imgCoach = coach.getImgCoach();

    return coachTypeORM;
  }
}