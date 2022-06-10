import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { CreateOfferValidator } from '../validators/create-offer.validator';
import { IdOfferValidator } from '../validators/id-offer-validator';
import { EditOfferValidator } from '../validators/edit-offer.validator';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { GetOfferByIdResponseDto } from '../dtos/response/get-offer-by-id-response.dto';
import { CreateOfferDto } from '../dtos/request/create-offer-request.dto';
import { EditOfferResponseDto } from '../dtos/response/edit-offer-response.dto';
import { CreateOfferCommand } from '../commands/create-offer.command';
import { CreateOfferResponseDto } from '../dtos/response/create-offer-response.dto';
import { DeleteOfferResponseDto } from '../dtos/response/delete-offer-response.dto';
import { DeleteOfferCommand } from '../commands/delete-offer.command';
import { GetOfferByIdQuery } from '../queries/get-offer-by-id.query';

@Injectable()
export class OffersApplicationService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private createOfferValidator: CreateOfferValidator,
    private idValidator: IdOfferValidator,
    private editOfferValidator: EditOfferValidator,
  ) {}
  async getById(
    id: number,
  ): Promise<Result<AppNotification, GetOfferByIdResponseDto>> {
    const notification: AppNotification = await this.idValidator.validate(id);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const getOfferByIdQuery: GetOfferByIdQuery = new GetOfferByIdQuery(id);

    const offerTypeORM = await this.queryBus.execute(getOfferByIdQuery);

    const getByIdResponseDto: GetOfferByIdResponseDto =
      new GetOfferByIdResponseDto(
        offerTypeORM.id.value,
        offerTypeORM.title,
        offerTypeORM.description,
        offerTypeORM.pricePerIndividualSession,
        offerTypeORM.pricePerGroupSession,
        offerTypeORM.typeMoney,
        offerTypeORM.statusPublication,
        offerTypeORM.coachId,
      );

    return Result.ok(getByIdResponseDto);
  }
  async register(
    createOfferRequestDto: CreateOfferDto,
  ): Promise<Result<AppNotification, EditOfferResponseDto>> {
    const notification: AppNotification =
      await this.createOfferValidator.validate(createOfferRequestDto);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const createOfferCommand: CreateOfferCommand = new CreateOfferCommand(
      createOfferRequestDto.title,
      createOfferRequestDto.description,
      createOfferRequestDto.pricePerIndividualSession,
      createOfferRequestDto.pricePerGroupSession,
      createOfferRequestDto.typeMoney,
      createOfferRequestDto.statusPublication,
      createOfferRequestDto.coachId,
    );
    const offerId = await this.commandBus.execute(createOfferCommand);

    const createOfferResponseDto: CreateOfferResponseDto =
      new CreateOfferResponseDto(
        offerId,
        createOfferRequestDto.title,
        createOfferRequestDto.description,
        createOfferRequestDto.pricePerIndividualSession,
        createOfferRequestDto.pricePerGroupSession,
        createOfferRequestDto.typeMoney,
        createOfferRequestDto.statusPublication,
        createOfferRequestDto.coachId,
      );

    return Result.ok(createOfferResponseDto);
  }

  async delete(
    id: number,
  ): Promise<Result<AppNotification, DeleteOfferResponseDto>> {
    const notification: AppNotification = await this.idValidator.validate(id);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const deleteOfferCommand: DeleteOfferCommand = new DeleteOfferCommand(id);

    const offerTypeORM = await this.commandBus.execute(deleteOfferCommand);

    const deleteOfferResponseDto: DeleteOfferResponseDto =
      new DeleteOfferResponseDto(
        offerTypeORM.id.value,
        offerTypeORM.title,
        offerTypeORM.description,
        offerTypeORM.pricePerIndividualSession,
        offerTypeORM.pricePerGroupSession,
        offerTypeORM.typeMoney,
        offerTypeORM.statusPublication,
        offerTypeORM.coachId,
      );

    return Result.ok(deleteOfferResponseDto);
  }
}
