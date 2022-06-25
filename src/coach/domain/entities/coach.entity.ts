import { AggregateRoot } from '@nestjs/cqrs';
import { CoachId } from '../value-objects/coach-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { CoachType } from '../enums/coach-type.enum';

export class Coach extends AggregateRoot {
  protected id: CoachId;
  protected type: CoachType;
  protected readonly auditTrail: AuditTrail;

  public constructor(type: CoachType, auditTrail: AuditTrail) {
    super();
    this.type = type;
    this.auditTrail = auditTrail;
  }

  public getId(): CoachId {
    return this.id;
  }

  public getType(): CoachType {
    return this.type;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeId(id: CoachId) {
    this.id = id;
  }
}