import { Money } from '../../../common/domain/value-objects/money.value';
import { AggregateRoot } from '@nestjs/cqrs';
import { CustomizationId } from '../value-objects/customization-id.value';
import { OfferId } from '../../../offers/domain/value-objects/offer-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { CustomizationType } from '../enums/customization-type.enum';
import { CustomizationStatus } from '../enums/customization.status.enum';
import { CostSaved } from '../events/cost-saved.event';
/*import { MoneyWithdrawn } from '../events/money-withdrawn.event';
import { MoneyTransferred } from '../events/money-transferred.event';*/

export class Customization extends AggregateRoot {
  private id: CustomizationId;
  private readonly type: CustomizationType;
  private readonly status: CustomizationStatus;
  private readonly offerFrom: OfferId;
  private readonly offerTo: OfferId;
  private readonly amount: Money;
  private readonly auditTrail: AuditTrail;

  public constructor(
    type: CustomizationType,
    status: CustomizationStatus,
    offerFrom: OfferId,
    offerTo: OfferId,
    amount: Money,
    auditTrail: AuditTrail,
  ) {
    super();
    this.type = type;
    this.status = status;
    this.offerFrom = offerFrom;
    this.offerTo = offerTo;
    this.amount = amount;
    this.auditTrail = auditTrail;
  }

  public cost() {
    const event = new CostSaved(
      this.id.getValue(),
      this.offerFrom.getValue(),
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

  public getOfferFrom(): OfferId {
    return this.offerFrom;
  }

  public getOfferTo(): OfferId {
    return this.offerTo;
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
