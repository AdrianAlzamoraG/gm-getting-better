import { AggregateRoot } from '@nestjs/cqrs';
import { UserId } from '../value-objects/user-id.value';
import { Name } from '../../../common/domain/value-objects/name.value';
import { Email } from '../../../common/domain/value-objects/email.value';
import { Dni } from '../../../common/domain/value-objects/dni.value';
import { Password } from '../../../common/domain/value-objects/password.value';
import { UserRegisteredEvent } from '../events/user-registered.event';

export class User extends AggregateRoot {
  private id: UserId;
  private name: Name;
  private dni: Dni;
  private email: Email;
  private password: Password;
    apply: any;
 

  constructor(
    id: UserId,
    name: Name,
    dni: Dni,
    email: Email,
    password: Password,
  
  ) {
    super();
    this.id = id;
    this.name = name;
    this.dni = dni;
    this.email = email;
    this.password = password;
    
  }
  public register() {
    const event = new UserRegisteredEvent(
      this.id.getValue(),
      this.name.getFirstName(),
      this.name.getLastName(),
      this.dni.getValue(),
      this.email.getValue(),
      this.password.getValue(),
      
    );
    this.apply(event);

  }
   
  public getId(): UserId {
    return this.id;
  }

  public getName(): Name {
    return this.name;
  }

  public getDni(): Dni {
    return this.dni;
  }

  public getEmail(): Email {
    return this.email;
  }

  public getPassword(): Password {
    return this.password;
  }

  public changeId(id: UserId) {
    this.id = id;
  }

  public changeName(name: Name): void {
    this.name = name;
  }

  public changeDni(dni: Dni): void {
    this.dni = dni;
  }

  public changeEmail(email: Email): void {
    this.email = email;
  }

  public changePassword(password: Password): void {
    this.password = password;
  }

  
}