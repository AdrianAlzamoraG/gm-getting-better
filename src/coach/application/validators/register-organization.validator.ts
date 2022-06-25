import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { Repository } from 'typeorm';
import { CoachTypeORM } from '../../infrastructure/persistence/typeorm/entities/coach.typeorm';
import { OrganizationTypeORM } from '../../infrastructure/persistence/typeorm/entities/organization.typeorm';
import { RegisterOrganizationRequest } from '../dtos/request/register-organization-request.dto';

@Injectable()
export class RegisterOrganizationValidator {
  constructor(
    @InjectRepository(OrganizationTypeORM)
    private organizationRepository: Repository<OrganizationTypeORM>,
  ) {}

  public async validate(
    registerOrganizationRequest: RegisterOrganizationRequest,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();
    const name: string = registerOrganizationRequest.name.trim();
    if (name.length <= 0) {
      notification.addError('name is required', null);
    }
    const ruc: string = registerOrganizationRequest.ruc.trim();
    if (ruc.length <= 0) {
      notification.addError('ruc is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const customer: CoachTypeORM = await this.organizationRepository
      .createQueryBuilder()
      .where('ruc = :ruc', { ruc })
      .getOne();
    if (customer != null) {
      notification.addError('ruc is taken', null);
    }
    return notification;
  }
}
