import { User } from '../../domain/entities/user.entity';
import { UserTypeORM } from '../../infrastructure/persistence/typeorm/entities/user.typeorm';
import { UserIdTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/user.id.typeorm';
import { NameTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/name.typeorm';
import { DniTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/dni.typeorm';
import { EmailTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/email.typeorm';
import { PasswordTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/password.typeorm';

export class UserMapper {
  public static toTypeORM(user: User): UserTypeORM {
    const userTypeORM: UserTypeORM = new UserTypeORM();
    userTypeORM.id = user.getId() != null ? user.getId().getValue() : 0;
    userTypeORM.name = NameTypeORM.from(
      user.getName().getFirstName(),
      user.getName().getLastName(),
    );
    userTypeORM.dni = DniTypeORM.from(user.getDni().getValue());
    userTypeORM.email = EmailTypeORM.from(user.getEmail().getValue());
    userTypeORM.password = PasswordTypeORM.from(user.getPassword().getValue());
    return userTypeORM;
  }
}
