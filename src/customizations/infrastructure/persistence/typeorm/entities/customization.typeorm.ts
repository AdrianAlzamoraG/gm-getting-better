import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { OfferIdFromTypeorm } from '../value-objects/offer-id-from.typeorm';
import { OfferIdToTypeorm } from '../value-objects/offer-id-to.typeorm';
import { AmountTypeORM } from '../value-objects/amount.typeorm';
import { AuditTrailTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';
import { CustomizationStatus } from '../../../../domain/enums/customization.status.enum';

@Entity('customizations')
export class CustomizationTypeorm {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    name: 'id',
    unsigned: true,
  })
  public id: number;

  @Column('char', { name: 'type', length: 1, nullable: false })
  public type: string;

  @Column((type) => OfferIdFromTypeorm, { prefix: false })
  public offerIdFrom: OfferIdFromTypeorm;

  @Column((type) => OfferIdToTypeorm, { prefix: false })
  public offerIdTo: OfferIdToTypeorm;

  @Column((type) => AmountTypeORM, { prefix: false })
  public amount: AmountTypeORM;

  @Column('tinyint', {
    name: 'status',
    width: 2,
    unsigned: true,
    nullable: false,
  })
  public status: CustomizationStatus;

  @Column((type) => AuditTrailTypeORM, { prefix: false })
  public auditTrail: AuditTrailTypeORM;
}
