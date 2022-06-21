import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { RegisterCoachValidator } from '../validators/register-coach.validator';
import { RegisterCoachRequestDto } from '../dtos/request/register-coach-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { RegisterCoachResponseDto } from '../dtos/response/register-coach-response.dto';
import { RegisterCoachCommand } from '../commands/register-coach.command';
import { GetCoachByIdResponseDto } from '../dtos/response/get-coach-by-id-response.dto';
import { IdCoachValidator } from '../validators/id-coach.validator';
import { GetCoachByIdQuery } from '../queries/get-coach-by-id.query';
import { DeleteCoachResponseDto } from '../dtos/response/delete-coach-response.dto';
import { DeleteCoachCommand } from '../commands/delete-coach.command';
import { UpdateCoachRequestDto } from '../dtos/request/update-coach-request.dto';
import { UpdateCoachResponseDto } from '../dtos/response/update-coach-response.dto';
import { UpdateCoachValidator } from '../validators/update-coach.validator';
import { UpdateCoachCommand } from '../commands/update-coach.command';
import { AuthenticateCoachRequestDto } from '../dtos/request/authenticate-coach-request.dto';
import { AuthenticateCoachResponseDto } from '../dtos/response/authenticate-coach-response.dto';
import { GetCoachByEmailQuery } from '../queries/get-coach-by-email.query';
import { RegisterNewAnnouncementRequestDto} from '../../../announcement/application/dtos/request/register-new-announcement-request.dto';
import { RegisterAnnouncementResponseDto } from '../../../announcement/application/dtos/response/register-announcement-response.dto';
import { RegisterAnnouncementValidator } from '../../../announcement/application/validators/register-applicant.validator';
import { RegisterNewAnnouncementValidator } from '../../../announcement/application/validators/register-new-announcement.validator';
import { RegisterAnnouncementCommand } from '../../../announcement/application/commands/register-announcement.command';
import { RegisterNewPaymentRequestDto } from '../../../payments/application/dtos/request/register-new-payment-request.dto';
import { RegisterPaymentResponseDto } from '../../../payments/application/dtos/response/register-payment-response.dto';
import { RegisterNewPaymentValidator } from '../../../payments/application/validators/register-new-payment.validator';
import { RegisterNewPaymentCommand } from '../handlers/commands/register-new-payment.command';

@Injectable()
export class CompaniesApplicationService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private registerCoachValidator: RegisterCoachValidator,
    private idValidator: IdCoachValidator,
    private updateCoachValidator: UpdateCoachValidator,
    private registerAnnouncementValidator: RegisterAnnouncementValidator,
    private registerNewAnnouncementValidator: RegisterNewAnnouncementValidator,
    private registerNewPaymentValidator: RegisterNewPaymentValidator,
  ) {}

  async getById(
    id: number,
  ): Promise<Result<AppNotification, GetCoachByIdResponseDto>> {
    const notification: AppNotification = await this.idValidator.validate(id);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const getCoachByIdQuery: GetCoachByIdQuery = new GetCoachByIdQuery(
      id,
    );

    const coachTypeORM = await this.queryBus.execute(getCoachByIdQuery);

    const getByIdResponseDto: GetCoachByIdResponseDto =
      new GetCoachByIdResponseDto(
        coachTypeORM.id.value,
        coachTypeORM.nameCoach.nameCoach,
        coachTypeORM.email.value,
        coachTypeORM.password.value,
        coachTypeORM.descriptionCoach,
        coachTypeORM.imgCoach,
      );

    return Result.ok(getByIdResponseDto);
  }

  async Authenticate(
    authenticateCoachRequestDto: AuthenticateCoachRequestDto
  ): Promise<Result<AppNotification, AuthenticateCoachResponseDto>>{
    /*if (notification.hasErrors()) {
      return Result.error(notification);
    }*/
    const getCoachByEmailQuery: GetCoachByEmailQuery =
      new GetCoachByEmailQuery(authenticateCoachRequestDto.email);



    const coachTypeORM = await this.queryBus.execute(getCoachByEmailQuery);

    if(getCoachByEmailQuery==null || authenticateCoachRequestDto.password !=coachTypeORM.password){
      const e: AppNotification = new AppNotification();
      e.addError(`email or password bad`, null);
      return Result.error(e);
    }

    const authenticateCoachResponseDto: AuthenticateCoachResponseDto =
      new AuthenticateCoachResponseDto(
        coachTypeORM.id,
        coachTypeORM.nameCoach,
        coachTypeORM.email,
        coachTypeORM.password,
        coachTypeORM.descriptionCoach,
        coachTypeORM.imgCoach,
      );
    return Result.ok(authenticateCoachResponseDto);
  }

  async register(
    registerCoachRequestDto: RegisterCoachRequestDto,
  ): Promise<Result<AppNotification, RegisterCoachResponseDto>> {
    const notification: AppNotification =
      await this.registerCoachValidator.validate(registerCoachRequestDto);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const registerCoachCommand: RegisterCoachCommand =
      new RegisterCoachCommand(
        registerCoachRequestDto.nameCoach,
        registerCoachRequestDto.email,
        registerCoachRequestDto.password,
        registerCoachRequestDto.descriptionCoach,
        registerCoachRequestDto.imgCoach,
      );
    const coachId = await this.commandBus.execute(registerCoachCommand);

    const registerCoachResponseDto: RegisterCoachResponseDto =
      new RegisterCoachResponseDto(
        coachId,
        registerCoachRequestDto.nameCoach,
        registerCoachRequestDto.email,
        registerCoachRequestDto.password,
        registerCoachRequestDto.descriptionCoach,
        registerCoachRequestDto.imgCoach,
      );

    return Result.ok(registerCoachResponseDto);
  }

  async update(
    id: number,
    updateCoachRequestDto: UpdateCoachRequestDto,
  ): Promise<Result<AppNotification, UpdateCoachResponseDto>> {
    const notification: AppNotification =
      await this.updateCoachValidator.validate(id, updateCoachRequestDto);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const updateCoachCommand: UpdateCoachCommand = new UpdateCoachCommand(
      id,
      updateCoachRequestDto.id,
      updateCoachRequestDto.nameCoach,
      updateCoachRequestDto.email,
      updateCoachRequestDto.password,
      updateCoachRequestDto.descriptionCoach,
      updateCoachRequestDto.imgCoach,
    );
    const coachTypeORM = await this.commandBus.execute(
      updateCoachCommand,
    );

    const updateCoachResponseDto: UpdateCoachResponseDto =
      new UpdateCoachResponseDto(
        coachTypeORM.id.value,
        coachTypeORM.nameCoach.nameCoach,
        coachTypeORM.email.value,
        coachTypeORM.password.value,
        coachTypeORM.descriptionCoach,
        coachTypeORM.imgCoach,
      );

    return Result.ok(updateCoachResponseDto);
  }

  async delete(
    id: number,
  ): Promise<Result<AppNotification, DeleteCoachResponseDto>> {
    const notification: AppNotification = await this.idValidator.validate(id);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const deleteCoachCommand: DeleteCoachCommand =
      new DeleteCoachCommand(id);

    const coachTypeORM = await this.commandBus.execute(
      deleteCoachCommand,
    );

    const deleteCoachResponseDto: DeleteCoachResponseDto =
      new DeleteCoachResponseDto(
        coachTypeORM.id.value,
        coachTypeORM.nameCoach.nameCoach,
        coachTypeORM.email.value,
        coachTypeORM.password.value,
        coachTypeORM.descriptionCoach,
        coachTypeORM.imgCoach,
      );

    return Result.ok(deleteCoachResponseDto);
  }
  async postA(
    id: number,
    registerAnnouncementDto: RegisterNewAnnouncementRequestDto,
  ): Promise<Result<AppNotification, RegisterAnnouncementResponseDto>> {
    const notification: AppNotification= await this.registerNewAnnouncementValidator.validate(registerAnnouncementDto,id);
    if (notification.hasErrors()){
      return Result.error(notification);
    }
    const registerAnnouncementCommand: RegisterAnnouncementCommand=new RegisterAnnouncementCommand(
      registerAnnouncementDto.title,
      registerAnnouncementDto.description,
      registerAnnouncementDto.requiredSpecialty,
      registerAnnouncementDto.requiredExperience,
      registerAnnouncementDto.salary,
      registerAnnouncementDto.typeMoney,
      registerAnnouncementDto.visible,
      id
    )
    const announcementId=await this.commandBus.execute(registerAnnouncementCommand);
    const registerAnnouncementResponseDto: RegisterAnnouncementResponseDto=new RegisterAnnouncementResponseDto(
      announcementId,
      registerAnnouncementDto.title,
      registerAnnouncementDto.description,
      registerAnnouncementDto.requiredSpecialty,
      registerAnnouncementDto.requiredExperience,
      registerAnnouncementDto.salary,
      registerAnnouncementDto.typeMoney,
      registerAnnouncementDto.visible,
      id
    );
    return Result.ok(registerAnnouncementResponseDto);
  }
  async pay(
    idc: number,
    registerPaymentDto: RegisterNewPaymentRequestDto,
  ): Promise<Result<AppNotification, RegisterPaymentResponseDto>> {
    const notification: AppNotification= await this.registerNewPaymentValidator.validate(registerPaymentDto,idc)
    if(notification.hasErrors()){
      return Result.error(notification);
    }
    const registerNewPaymentCommand: RegisterNewPaymentCommand= new RegisterNewPaymentCommand(
      registerPaymentDto.amount,
      idc,
      registerPaymentDto.PaymentOption,
      registerPaymentDto.suscription,
      registerPaymentDto.date
    )
    const paymentId=await this.commandBus.execute(registerNewPaymentCommand);
    const registerPaymentResponseDto:RegisterPaymentResponseDto=new RegisterPaymentResponseDto(
      paymentId,
      registerPaymentDto.amount,
      idc,
      registerPaymentDto.PaymentOption,
      registerPaymentDto.suscription,
      registerPaymentDto.date,
    );
    return Result.ok(registerPaymentResponseDto);
  }
}