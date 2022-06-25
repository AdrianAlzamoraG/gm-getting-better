import { CoachId } from '../value-objects/coach-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { Coach } from './coach.entity';
import { Ruc } from '../value-objects/ruc.value';
import { CoachType } from '../enums/coach-type.enum';
import { OrganizationRegistered } from '../events/organization-registered.event';
import { OrganizationName } from '../../../common/domain/value-objects/organization-name.value';

export class Organization extends Coach {
  private name: OrganizationName;
  private ruc: Ruc;

  public constructor(name: OrganizationName, ruc: Ruc, auditTrail: AuditTrail) {
    super(CoachType.ORGANIZATION, auditTrail);
    this.name = name;
    this.ruc = ruc;
  }

  public register() {
    const event = new OrganizationRegistered(
      this.id.getValue(),
      this.name.getValue(),
      this.ruc.getValue(),
    );
    this.apply(event);
  }

  public getId(): CoachId {
    return this.id;
  }

  public getName(): OrganizationName {
    return this.name;
  }

  public getRuc(): Ruc {
    return this.ruc;
  }

  public changeName(name: OrganizationName): void {
    this.name = name;
  }

  public changeRuc(ruc: Ruc): void {
    this.ruc = ruc;
  }
}
