import { Column, Entity } from 'typeorm';
import { AuditTrailTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';
import { OfferIdTypeORM } from '../value-objects/offer-id.typeorm';

@Entity('offers')
export class OfferTypeORM {
  @Column((type) => OfferIdTypeORM, { prefix: false })
  public id: OfferIdTypeORM;

  @Column((type) => AuditTrailTypeORM, { prefix: false })
  public auditTrail: AuditTrailTypeORM;

  @Column('varchar', { name: 'title', length: 600, nullable: false })
  public title: string;
  @Column('varchar', { name: 'description', length: 700, nullable: false })
  public description: string;
  @Column('int', { name: 'pricePerIndividualSession', nullable: false })
  public pricePerIndividualSession: number;
  @Column('int', { name: 'pricePerGroupSession', nullable: false })
  public pricePerGroupSession: number;

  @Column('varchar', { name: 'typeMoney', length: 100, nullable: false })
  public typeMoney: string;
  @Column('bool', { name: 'statusPublication', nullable: false })
  public statusPublication: boolean;
  /*@Column('int', { name: 'coachId', nullable: false })
  public coachId: number;*/
  @Column('varchar', { name: 'createdAt', length: 100, nullable: false })
  public createdAt: string;
}
