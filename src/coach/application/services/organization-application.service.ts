import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterOrganizationValidator } from '../validators/register-organization.validator';
import { RegisterOrganization } from '../commands/register-organization.command';
import { RegisterOrganizationRequest } from '../dtos/request/register-organization-request.dto';
import { RegisterOrganizationResponse } from '../dtos/response/register-organization-response.dto';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { AppSettings } from '../../../common/application/app-settings';

@Injectable()
export class OrganizationApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerOrganizationValidator: RegisterOrganizationValidator,
  ) {}

  async register(
    registerOrganizationRequest: RegisterOrganizationRequest,
  ): Promise<Result<AppNotification, RegisterOrganizationResponse>> {
    const notification: AppNotification = await this.registerOrganizationValidator.validate(registerOrganizationRequest);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const createdAt = DateTime.utcNow().format();
    const createdBy = AppSettings.SUPER_ADMIN;
    const updatedAt = null;
    const updatedBy = null;
    const registerOrganization: RegisterOrganization = new RegisterOrganization(
      registerOrganizationRequest.name,
      registerOrganizationRequest.ruc,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy
    );
    const coachId = await this.commandBus.execute(registerOrganization);
    const registerOrganizationResponse: RegisterOrganizationResponse = new RegisterOrganizationResponse(
      coachId,
      registerOrganizationRequest.name,
      registerOrganizationRequest.ruc
    );
    return Result.ok(registerOrganizationResponse);
  }
}