import { ChildEntity, Column, Unique } from 'typeorm';
import { CoachTypeORM } from './coach.typeorm';
import { DniTypeORM } from '../value-objects/dni.typeorm';
import { PersonNameTypeORM } from '../value-objects/person-name.typeorm';
import { CoachType } from '../../../../domain/enums/coach-type.enum';

@ChildEntity(CoachType.PERSON)
export class PersonTypeORM extends CoachTypeORM {
  @Column((type) => PersonNameTypeORM, { prefix: false })
  public name: PersonNameTypeORM;

  @Column((type) => DniTypeORM, { prefix: false })
  public dni: DniTypeORM;
}
