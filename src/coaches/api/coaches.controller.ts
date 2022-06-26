import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { RegisterPersonRequest } from '../application/dtos/request/register-person-request.dto';
import { RegisterPersonResponse } from '../application/dtos/response/register-person-response.dto';
import { OrganizationApplicationService } from '../application/services/organization-application.service';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { GetCustomersPersonQuery } from '../application/queries/get-customers-person.query';
import { PersonApplicationService } from '../application/services/person-application.service';
import { RegisterOrganizationRequest } from '../application/dtos/request/register-organization-request.dto';
import { RegisterOrganizationResponse } from '../application/dtos/response/register-organization-response.dto';
import { GetCustomersOrganizationQuery } from '../application/queries/get-customers-organization.query';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetCustomersPersonDto } from '../application/dtos/queries/get-customers-person.dto';
import { GetCustomersOrganizationDto } from '../application/dtos/queries/get-customers-organization.dto';

@ApiTags('Coaches')
@Controller('coaches')
export class CoachesController {
  constructor(
    private readonly personApplicationService: PersonApplicationService,
    private readonly organizationApplicationService: OrganizationApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('/person')
  @ApiOperation({ summary: 'Crete a new Coach' })
  @ApiResponse({
    status: 201,
    description: 'Coach created',
  })
  async registerPerson(
    @Body() registerPersonRequest: RegisterPersonRequest,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterPersonResponse> =
        await this.personApplicationService.register(registerPersonRequest);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }


  @Post('/organization')
  @ApiOperation({ summary: 'Crete a new Organization' })
  @ApiResponse({
    status: 201,
    description: 'Organization created',
  })
  async registerOrganization(
    @Body() registerOrganizationRequest: RegisterOrganizationRequest,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterOrganizationResponse> =
        await this.organizationApplicationService.register(
          registerOrganizationRequest,
        );
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/person')
  @ApiOperation({ summary: 'Get All Coaches' })
  @ApiResponse({
    status: 200,
    description: 'All coaches returned',
    type: GetCustomersPersonDto,
    isArray: true,
  })
  async getCustomersPerson(
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const customers = await this.queryBus.execute(
        new GetCustomersPersonQuery(),
      );
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/organization')
  @ApiOperation({ summary: 'Get All Organizations' })
  @ApiResponse({
    status: 200,
    description: 'All organizations returned',
    type: GetCustomersOrganizationDto,
    isArray: true,
  })
  async getCustomersOrganization(
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const customers = await this.queryBus.execute(
        new GetCustomersOrganizationQuery(),
      );
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
