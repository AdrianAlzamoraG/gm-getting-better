import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CoachApplicationService } from '../application/services/coach-application.service';
import { QueryBus } from '@nestjs/cqrs';
import { RegisterCoachRequestDto } from '../application/dtos/request/register-coach-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { RegisterCoachResponseDto } from '../application/dtos/response/register-coach-response.dto';
import { ApiController } from '../../common/api/api.controller';
import { GetCoachQuery } from '../application/queries/get-coach.query';
import { GetCoachByIdDto } from '../application/dtos/queries/get-coach-by-id.dto';
import { DeleteCoachResponseDto } from '../application/dtos/response/delete-coach-response.dto';
import { UpdateCoachRequestDto } from '../application/dtos/request/update-coach-request.dto';
import { UpdateCoachResponseDto } from '../application/dtos/response/update-coach-response.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetCoachDto } from '../application/dtos/queries/get-coach.dto';
import { AuthenticateCoachRequestDto } from '../application/dtos/request/authenticate-coach-request.dto';
import { AuthenticateCoachResponseDto } from '../application/dtos/response/authenticate-coach-response.dto';
import { GetAnnouncementsDto } from '../../announcement/application/dtos/queries/get-announcements.dto';
import { RegisterNewAnnouncementRequestDto } from '../../announcement/application/dtos/request/register-new-announcement-request.dto';
import { RegisterAnnouncementResponseDto } from '../../announcement/application/dtos/response/register-announcement-response.dto';
import { GetPaymentsDto } from '../../payments/application/dtos/queries/get-payments.dto';
import { RegisterNewPaymentRequestDto } from '../../payments/application/dtos/request/register-new-payment-request.dto';
import { RegisterPaymentResponseDto } from '../../payments/application/dtos/response/register-payment-response.dto';

//Controller
@ApiBearerAuth()
@ApiTags('coach')
@Controller('coach')
export class CoachController {
  constructor(
    private readonly coachApplicationService: CoachApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get All Coach' })
  @ApiResponse({
    status: 200,
    description: 'All coach returned',
    type: GetCoachDto,
    isArray: true,
  })
  async getCoach(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const coach = await this.queryBus.execute(new GetCoachQuery());
      return ApiController.ok(response, coach);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Coach by Id' })
  @ApiResponse({
    status: 200,
    description: 'Coach returned',
    type: GetCoachDto,
  })
  async getCoachById(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, GetCoachByIdDto> =
        await this.coachApplicationService.getById(id);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.ok(response, result);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Post('auth')
  @ApiOperation({ summary: 'Authenticate' })
  @ApiResponse({
    status: 201,
    description: 'Sign in',
    type: GetCoachDto,
  })
  async Authenticate(
    @Body() authenticateCoachRequestDto: AuthenticateCoachRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, AuthenticateCoachResponseDto> =
        await this.coachApplicationService.Authenticate(
          authenticateCoachRequestDto,
        );
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create new Coach' })
  @ApiResponse({
    status: 201,
    description: 'Coach created',
    type: GetCoachDto,
  })
  async register(
    @Body() registerCoachRequestDto: RegisterCoachRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterCoachResponseDto> =
        await this.coachApplicationService.register(registerCoachRequestDto);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update coach information' })
  @ApiResponse({
    status: 202,
    description: 'Coach information updated',
    type: GetCoachDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateCoachRequestDto: UpdateCoachRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, UpdateCoachResponseDto> =
        await this.coachApplicationService.update(id, updateCoachRequestDto);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Coach by Id' })
  @ApiResponse({
    status: 202,
    description: 'Coach deleted',
    type: GetCoachDto,
  })
  async delete(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, DeleteCoachResponseDto> =
        await this.coachApplicationService.delete(id);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
  @Post('postAnn/:id')
  @ApiOperation({ summary: 'Announcement create' })
  @ApiResponse({
    status: 201,
    description: 'Announcement create',
    type: GetAnnouncementsDto,
  })
  async registerAnn(
    @Param('id') id: number,
    @Body() registerAnnouncementDto: RegisterNewAnnouncementRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterAnnouncementResponseDto> =
        await this.coachApplicationService.postA(id, registerAnnouncementDto);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
  @Post('pay/:id')
  @ApiOperation({ summary: 'Payment create' })
  @ApiResponse({
    status: 201,
    description: 'Payment create',
    type: GetPaymentsDto,
  })
  async pay(
    @Param('id') id: number,
    @Body() registerPayDto: RegisterNewPaymentRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterPaymentResponseDto> =
        await this.coachApplicationService.pay(id, registerPayDto);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
