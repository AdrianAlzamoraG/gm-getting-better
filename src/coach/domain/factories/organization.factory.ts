import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { OrganizationName } from '../../../common/domain/value-objects/organization-name.value';
import { Organization } from '../entities/organization.entity';
import { Ruc } from '../value-objects/ruc.value';

export class OrganizationFactory {
  public static createFrom(name: OrganizationName, ruc: Ruc, auditTrail: AuditTrail): Organization {
    return new Organization(name, ruc, auditTrail);
  }
}