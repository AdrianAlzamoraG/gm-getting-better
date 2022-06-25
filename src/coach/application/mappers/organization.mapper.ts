import { RucTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/ruc.typeorm';
import { Organization } from '../../domain/entities/organization.entity';
import { OrganizationTypeORM } from '../../infrastructure/persistence/typeorm/entities/organization.typeorm';
import { OrganizationNameTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/organization-name.typeorm';
import { AuditTrailTypeORM } from '../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';

export class OrganizationMapper {
  public static toTypeORM(organization: Organization): OrganizationTypeORM {
    const organizationTypeORM: OrganizationTypeORM = new OrganizationTypeORM();
    organizationTypeORM.organizationName = OrganizationNameTypeORM.from(
      organization.getName().getValue(),
    );
    organizationTypeORM.ruc = RucTypeORM.from(organization.getRuc().getValue());
    const createdAt: string =
      organization.getAuditTrail() != null &&
      organization.getAuditTrail().getCreatedAt() != null
        ? organization.getAuditTrail().getCreatedAt().format()
        : null;
    const createdBy: number =
      organization.getAuditTrail() != null &&
      organization.getAuditTrail().getCreatedBy() != null
        ? organization.getAuditTrail().getCreatedBy().getValue()
        : null;
    const updatedAt: string =
      organization.getAuditTrail() != null &&
      organization.getAuditTrail().getUpdatedAt() != null
        ? organization.getAuditTrail().getUpdatedAt().format()
        : null;
    const updatedBy: number =
      organization.getAuditTrail() != null &&
      organization.getAuditTrail().getUpdatedBy() != null
        ? organization.getAuditTrail().getUpdatedBy().getValue()
        : null;
    const auditTrailTypeORM: AuditTrailTypeORM = AuditTrailTypeORM.from(
      createdAt,
      createdBy,
      updatedAt,
      updatedBy,
    );
    organizationTypeORM.auditTrail = auditTrailTypeORM;
    return organizationTypeORM;
  }
}
