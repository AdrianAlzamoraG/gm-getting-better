import { Controller, Post, Body, Res, Get, Patch, Param } from '@nestjs/common';
import { OpenOfferRequest } from '../application/dtos/request/open-offer-request.dto';
import { OpenOfferResponse } from '../application/dtos/response/open-offer-response.dto';
import { OffersApplicationService } from '../application/services/offers-application.service';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { GetOfferByIdQuery } from '../application/queries/get-offer-by-id.query';
import { GetOffersQuery } from '../application/queries/get-offers.query';

@Controller('accounts')
export class OffersController {
  constructor(
    private readonly offersApplicationService: OffersApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async open(
    @Body() openOfferRequest: OpenOfferRequest,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, OpenOfferResponse> =
        await this.offersApplicationService.open(openOfferRequest);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  async getOffers(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const customers = await this.queryBus.execute(new GetOffersQuery());
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  async getById(
    @Param('id') offerId: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const customers = await this.queryBus.execute(
        new GetOfferByIdQuery(offerId),
      );
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
