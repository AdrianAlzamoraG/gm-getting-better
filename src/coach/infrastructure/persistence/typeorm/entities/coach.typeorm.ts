import { Column, Entity, PrimaryGeneratedColumn, TableInheritance, Unique } from 'typeorm';
import { AuditTrailTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';
import { CoachType } from '../../../../domain/enums/coach-type.enum';

@Entity('coachs')
@TableInheritance({ column: 'type', })
export class CoachTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column((type) => AuditTrailTypeORM, { prefix: false })
  public auditTrail: AuditTrailTypeORM;

  @Column({ name: 'type', type: 'enum', enum: CoachType, default: CoachType.COMPANY })
  readonly type: CoachType;
}