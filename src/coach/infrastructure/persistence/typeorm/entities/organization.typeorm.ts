import { ChildEntity, Column, Unique } from 'typeorm';
import { CoachTypeORM } from './coach.typeorm';
import { RucTypeORM } from '../value-objects/ruc.typeorm';
import { OrganizationNameTypeORM } from '../value-objects/organization-name.typeorm';
import { CoachType } from '../../../../domain/enums/coach-type.enum';

@ChildEntity(CoachType.ORGANIZATION)
export class OrganizationTypeORM extends CoachTypeORM {
  @Column((type) => OrganizationNameTypeORM, { prefix: false })
  public organizationName: OrganizationNameTypeORM;

  @Column((type) => RucTypeORM, { prefix: false })
  public ruc: RucTypeORM;
}