import { User } from '../entities/user.entity';
import { UserId } from '../value-objects/user-id.value';
import { Name } from '../../../common/domain/value-objects/name.value';
import { Dni } from '../../../common/domain/value-objects/dni.value';
import { Email } from '../../../common/domain/value-objects/email.value';
import { Password } from '../../../common/domain/value-objects/password.value';

export class UserFactory {
  public static createFrom(
    name: Name,
    dni: Dni,
    email: Email,
    password: Password,
  ): User {
    return new User(UserId.create(0), name, dni, email, password);
  }

  public static withId(
    userId: UserId,
    name: Name,
    dni: Dni,
    email: Email,
    password: Password,
  ): User {
    return new User(userId, name, dni, email, password);
  }
}
