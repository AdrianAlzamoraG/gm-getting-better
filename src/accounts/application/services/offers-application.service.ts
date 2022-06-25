import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { OpenOffer } from '../commands/open-offer.command';
import { OpenOfferResponse } from '../dtos/response/open-offer-response.dto';
import { OpenOfferValidator } from '../validators/open-offer-validator.service';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
import { OpenOfferRequest } from '../dtos/request/open-offer-request.dto';

@Injectable()
export class OffersApplicationService {
  constructor(
    private commandBus: CommandBus,
    private openOfferValidator: OpenOfferValidator,
  ) {}

  async open(
    openOfferRequestDto: OpenOfferRequest,
  ): Promise<Result<AppNotification, OpenOfferResponse>> {
    const notification: AppNotification =
      await this.openOfferValidator.validate(openOfferRequestDto);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const openOffer: OpenOffer = new OpenOffer(
      openOfferRequestDto.coachId,
      openOfferRequestDto.title,
    );
    const offerId: number = await this.commandBus.execute(openOffer);
    const openOfferResponse: OpenOfferResponse = new OpenOfferResponse(
      offerId,
      openOffer.title,
      0,
      null,
      1,
      null,
      null,
      openOffer.coachId,
    );
    return Result.ok(openOfferResponse);
  }
}
