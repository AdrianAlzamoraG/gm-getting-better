import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { OfferTitleTypeorm } from '../value-objects/offer-title.typeorm';
import { OfferIdTypeorm } from '../value-objects/offer-id.typeorm';
import { BalanceTypeORM } from '../value-objects/balance.typeorm';
import { CoachIdTypeorm } from '../value-objects/coach-id.typeorm';
import { AuditTrailTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';

@Entity('offers')
export class OfferTypeORM {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    name: 'id',
    unsigned: true,
  })
  public id: number;

  @Column((type) => OfferTitleTypeorm, { prefix: false })
  public title: OfferTitleTypeorm;

  @Column((type) => BalanceTypeORM, { prefix: false })
  public balance: BalanceTypeORM;

  @Column((type) => CoachIdTypeorm, { prefix: false })
  public coachId: CoachIdTypeorm;

  @Column((type) => AuditTrailTypeORM, { prefix: false })
  public auditTrail: AuditTrailTypeORM;
}
