import { AggregateRoot } from '@nestjs/cqrs';
import { CoachId } from '../value-objects/coach-id.value';
import { Name } from '../../../common/domain/value-objects/name.value';
import { Email } from '../../../common/domain/value-objects/email.value';
import { Dni } from '../../../common/domain/value-objects/dni.value';
import { Password } from '../../../common/domain/value-objects/password.value';
import { CoachRegisteredEvent } from '../events/coach-registered.event';

export class User extends AggregateRoot {
  private id: CoachId;
  private name: Name;
  private dni: Dni;
  private email: Email;
  private password: Password;
    apply: any;
 

  constructor(
    id: CoachId,
    email: Email,
    password: Password,
    name: Name,  
  ) {
    super();
    this.id = id;   
    this.email = email;
    this.password = password;
    this.name = name;  
  }
  public register() {
    const event = new CoachRegisteredEvent(
      this.id.getValue(),
      this.email.getValue(),
      this.password.getValue(),
      this.name.getFirstName(),  
         
      
    );
    this.apply(event);

  }
   
  public getId(): CoachId {
    return this.id;
  }

    public getEmail(): Email {
    return this.email;
  }

  public getPassword(): Password {
    return this.password;
  }

  public getName(): Name {
    return this.name;
  }

  public changeId(id: CoachId) {
    this.id = id;
  }
 

  public changeEmail(email: Email): void {
    this.email = email;
  }

  public changePassword(password: Password): void {
    this.password = password;
  }
  public changeName(name: Name): void {
    this.name = name;
  }}