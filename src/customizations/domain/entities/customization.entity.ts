import { Money } from '../../../common/domain/value-objects/money.value';
import { AggregateRoot } from '@nestjs/cqrs';
import { CustomizationId } from '../value-objects/customization-id.value';
import { OfferId } from '../../../offers/domain/value-objects/offer-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { CustomizationType } from '../enums/customization-type.enum';
import { CustomizationStatus } from '../enums/customization.status.enum';
import { CostSaved } from '../events/money-deposited.event';
import { MoneyWithdrawn } from '../events/money-withdrawn.event';
import { MoneyTransferred } from '../events/money-transferred.event';

export class Customization extends AggregateRoot {
  private id: CustomizationId;
  private readonly type: CustomizationType;
  private readonly status: CustomizationStatus;
  private readonly accountFrom: OfferId;
  private readonly accountTo: OfferId;
  private readonly amount: Money;
  private readonly auditTrail: AuditTrail;

  public constructor(
    type: CustomizationType,
    status: CustomizationStatus,
    accountFrom: OfferId,
    accountTo: OfferId,
    amount: Money,
    auditTrail: AuditTrail,
  ) {
    super();
    this.type = type;
    this.status = status;
    this.accountFrom = accountFrom;
    this.accountTo = accountTo;
    this.amount = amount;
    this.auditTrail = auditTrail;
  }

  public cost() {
    const event = new CostSaved(
      this.id.getValue(),
      this.accountFrom.getValue(),
      this.amount.getAmount(),
      this.status,
      null,
    );
    this.apply(event);
  }

  /*  public withdraw() {
    const event = new MoneyWithdrawn(this.id.getValue(), this.accountFrom.getValue(), this.amount.getAmount(), this.status, null);
    this.apply(event);
  }

  public transfer() {
    const event = new MoneyTransferred(this.id.getValue(), this.accountFrom.getValue(), this.accountTo.getValue(), this.amount.getAmount(), this.status, null);
    this.apply(event);
  }*/

  public getId(): CustomizationId {
    return this.id;
  }

  public getType(): CustomizationType {
    return this.type;
  }

  public getStatus(): CustomizationStatus {
    return this.status;
  }

  public getAccountFrom(): OfferId {
    return this.accountFrom;
  }

  public getAccountTo(): OfferId {
    return this.accountTo;
  }

  public getAmount(): Money {
    return this.amount;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeId(id: CustomizationId) {
    this.id = id;
  }
}
