import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { CoachName } from '../../../common/domain/value-objects/coach-name.value';
import { Coach } from '../entities/coach.entity';
import { Ruc } from '../value-objects/ruc.value';

export class CoachFactory {
  public static createFrom(name: CoachName, ruc: Ruc, auditTrail: AuditTrail): Coach {
    return new Coach(name, ruc, auditTrail);
  }
}