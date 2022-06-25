import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterOrganization } from 'src/coaches/application/commands/register-organization.command';
import { Repository } from 'typeorm';
import { CoachId } from '../../../domain/value-objects/coach-id.value';
import { Ruc } from '../../../domain/value-objects/ruc.value';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { OrganizationMapper } from '../../mappers/organization.mapper';
import { OrganizationName } from '../../../../common/domain/value-objects/organization-name.value';
import { OrganizationFactory } from '../../../domain/factories/organization.factory';
import { Organization } from '../../../domain/entities/organization.entity';
import { OrganizationTypeORM } from '../../../infrastructure/persistence/typeorm/entities/organization.typeorm';
import { AuditTrail } from '../../../../common/domain/value-objects/audit-trail.value';
import { DateTime } from '../../../../common/domain/value-objects/date-time.value';
import { UserId } from '../../../../users/domain/value-objects/user-id.value';

@CommandHandler(RegisterOrganization)
export class RegisterOrganizationHandler
  implements ICommandHandler<RegisterOrganization>
{
  constructor(
    @InjectRepository(OrganizationTypeORM)
    private organizationRepository: Repository<OrganizationTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: RegisterOrganization) {
    let coachId = 0;
    const organizationNameResult: Result<AppNotification, OrganizationName> =
      OrganizationName.create(command.name);
    if (organizationNameResult.isFailure()) {
      return coachId;
    }
    const rucResult: Result<AppNotification, Ruc> = Ruc.create(command.ruc);
    if (rucResult.isFailure()) {
      return coachId;
    }
    const auditTrail: AuditTrail = AuditTrail.from(
      command.createdAt != null ? DateTime.fromString(command.createdAt) : null,
      command.createdBy != null ? UserId.of(command.createdBy) : null,
      command.updatedAt != null ? DateTime.fromString(command.updatedAt) : null,
      command.updatedBy != null ? UserId.of(command.updatedBy) : null,
    );
    let organization: Organization = OrganizationFactory.createFrom(
      organizationNameResult.value,
      rucResult.value,
      auditTrail,
    );
    let organizationTypeORM: OrganizationTypeORM =
      OrganizationMapper.toTypeORM(organization);
    organizationTypeORM = await this.organizationRepository.save(
      organizationTypeORM,
    );
    if (organizationTypeORM == null) {
      return coachId;
    }
    coachId = Number(organizationTypeORM.id);
    organization.changeId(CoachId.of(coachId));
    organization = this.publisher.mergeObjectContext(organization);
    organization.register();
    organization.commit();
    return coachId;
  }
}
