import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterCoachCommand } from '../../commands/register-coach.command';
import { InjectRepository } from '@nestjs/typeorm';
import { CoachTypeORM } from '../../../infrastructure/persistence/typeorm/entities/coach.typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { NameCoach } from '../../../domain/value-objects/namecoach.value';
import { Email } from '../../../../common/domain/value-objects/email.value';
import { Password } from '../../../../common/domain/value-objects/password.value';
import { CoachFactory } from '../../../../common/domain/factories/user/factories/concrete/coach.factory';
import { Coach } from '../../../domain/entities/coach.entity';
import { CoachMapper } from '../../mappers/coach.mapper';
import { CoachId } from '../../../domain/value-objects/coach-id.value';
import { UserAbstractFactory } from '../../../../common/domain/factories/user/factories/abstract/user-abstract.factory';
import { UserFactoryMethod } from '../../../../common/domain/factories/user/factories/user.factory.method';
import { UserType } from '../../../../common/domain/factories/user/enum/user-type';
import { User } from "../../../../common/domain/factories/user/entities/abstract/user";

@CommandHandler(RegisterCoachCommand)
export class RegisterOrganizationHandler
  implements ICommandHandler<RegisterCoachCommand>
{
  constructor(
    @InjectRepository(CoachTypeORM)
    private organizationRepository: Repository<CoachTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: RegisterCoachCommand) {
    const nameResult: Result<AppNotification, NameCoach> = NameCoach.create(
      command.nameCoach,
    );

    if (nameResult.isFailure()) {
      return 0;
    }

    const emailResult: Result<AppNotification, Email> = Email.create(
      command.email,
    );

    if (emailResult.isFailure()) {
      return 0;
    }

    const passwordResult: Result<AppNotification, Password> = Password.create(
      command.password,
    );

    if (passwordResult.isFailure()) {
      return 0;
    }

    const userFactory: UserAbstractFactory = UserFactoryMethod.getType(
      UserType.COMPANY,
    );

    let coach: Coach = userFactory.createFrom({
      nameCoach: nameResult.value,
      email: emailResult.value,
      password: passwordResult.value,
      descriptionCoach: command.descriptionCoach,
      imgCoach: command.imgCoach,
    });

    let coachTypeORM = CoachMapper.toTypeORM(coach);
    coachTypeORM = await this.coachRepository.save(coachTypeORM);

    if (coachTypeORM == null) {
      return 0;
    }

    const coachId = Number(coachTypeORM.id.value);
    coach.changeId(CoachId.create(coachId));

    coach = this.publisher.mergeObjectContext(coach);
    coach.register();
    coach.commit();

    return coachId;
  }
}