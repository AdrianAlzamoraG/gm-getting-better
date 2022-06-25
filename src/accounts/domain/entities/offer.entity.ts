import { CoachId } from '../../../coaches/domain/value-objects/offer-id.value';
import { Money } from '../../../common/domain/value-objects/money.value';
import { AppNotification } from '../../../common/application/app.notification';
import { Result } from 'typescript-result';
import { AggregateRoot } from '@nestjs/cqrs';
import { OfferId } from '../value-objects/offer-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { OfferTitle } from '../value-objects/offer-title.value';
import { OfferOpened } from '../events/offer-opened.event';

export class Offer extends AggregateRoot {
  private id: OfferId;
  private readonly title: OfferTitle;
  private balance: Money;
  private readonly coachId: CoachId;
  private readonly auditTrail: AuditTrail;

  public constructor(
    title: OfferTitle,
    balance: Money,
    coachId: CoachId,
    auditTrail: AuditTrail,
  ) {
    super();
    this.title = title;
    this.balance = balance;
    this.coachId = coachId;
    this.auditTrail = auditTrail;
  }

  public open() {
    const event = new OfferOpened(
      this.id.getValue(),
      this.title.getValue(),
      this.coachId.getValue(),
    );
    this.apply(event);
  }

  public cost(amount: Money): Result<AppNotification, Offer> {
    const notification: AppNotification = this.validate(amount);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    this.balance = this.balance.add(amount);
    return Result.ok(this);
  }

  public validate(amount: Money): AppNotification {
    const notification: AppNotification = new AppNotification();
    if (amount.getAmount() <= 0) {
      notification.addError('The amount must be greater than zero', null);
    }
    if (!this.hasIdentity()) {
      notification.addError('The account has no identity', null);
    }
    return notification;
  }

  public exist(): boolean {
    return this.id != null && this.id.getValue() > 0;
  }

  public doesNotExist(): boolean {
    return !this.exist();
  }

  public hasIdentity(): boolean {
    return this.title.getValue().trim().length > 0;
  }

  public getId(): OfferId {
    return this.id;
  }

  public getTitle(): OfferTitle {
    return this.title;
  }

  public getBalance(): Money {
    return this.balance;
  }

  public getCoachId(): CoachId {
    return this.coachId;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeId(id: OfferId) {
    this.id = id;
  }
}
