import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from '../../commands/register-user.commad';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTypeORM } from '../../../infrastructure/persistence/typeorm/entities/user.typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { Dni } from '../../../../common/domain/value-objects/dni.value';
import { Name } from '../../../../common/domain/value-objects/name.value';
import { Email } from '../../../../common/domain/value-objects/email.value';
import { Password } from '../../../../common/domain/value-objects/password.value';
import { User } from '../../../domain/entities/user.entity';
import { UserFactory } from '../../../domain/factories/user.factory';
import { UserMapper } from '../../mappers/user.mapper';
import { UserId } from '../../../domain/value-objects/user-id.value';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand>
{
  constructor(
    @InjectRepository(UserTypeORM)
    private userRepository: Repository<UserTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: RegisterUserCommand) {
    const dniResult: Result<AppNotification, Dni> = Dni.create(command.dni);
    if (dniResult.isFailure()) {
      return 0;
    }

    const nameResult: Result<AppNotification, Name> = Name.create(
      command.firstName,
      command.lastName,
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

    let user: User = UserFactory.createFrom(
      nameResult.value,
      dniResult.value,
      emailResult.value,
      passwordResult.value,
    );
    let userTypeORM = UserMapper.toTypeORM(user);
    userTypeORM = await this.userRepository.save(userTypeORM);
    if (userTypeORM == null) {
      return 0;
    }

    const userId = Number(userTypeORM.id);
    user.changeId(UserId.create(userId));
    user = this.publisher.mergeObjectContext(user);
    user.register();
    user.commit();
    return userId;
  }
}
