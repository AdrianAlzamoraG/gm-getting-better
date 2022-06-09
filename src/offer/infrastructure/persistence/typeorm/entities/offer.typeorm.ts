import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { AuditTrailTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';

@Entity('offer')
export class OfferTypeorm {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    name: 'id',
    unsigned: true,
  })
  public id: number;

  @Column((type) => AuditTrailTypeORM, { prefix: false })
  public auditTrail: AuditTrailTypeORM;

  @Column('varchar', { name: 'title', length: 550, nullable: false })
  public title: string;
  @Column('varchar', { name: 'description', length: 700, nullable: false })
  public description: string;
  @Column('bool', { name: 'statusPublication', nullable: false })
  public visible: boolean;
}
