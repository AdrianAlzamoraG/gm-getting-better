import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OffersApplicationService } from '../application/services/offers-application.service';
import { QueryBus } from '@nestjs/cqrs';
import { GetOffersDto } from '../application/dtos/queries/get-offers.dto';
import { GetOffersQuery } from '../application/queries/get-offer-query';
import { ApiController } from '../../common/api/api.controller';
import { AppNotification } from '../../common/application/app.notification';
import { DeleteOfferResponseDto } from '../application/dtos/response/delete-offer-response.dto';
import { Result } from 'typescript-result';
import { GetOfferByIdDto } from '../application/dtos/queries/get-offer-by-id.dto';
import { CreateOfferResponseDto } from '../application/dtos/response/create-offer-response.dto';
import { CreateOfferDto } from '../application/dtos/request/create-offer-request.dto';

@ApiBearerAuth()
@ApiTags('offers')
@Controller('offers')
export class OfferController {
  constructor(
    private readonly offersApplicationService: OffersApplicationService,
    private readonly queryBus: QueryBus,
  ) {}
  @Get()
  @ApiOperation({ summary: 'Get All Coach' })
  @ApiResponse({
    status: 200,
    description: 'All offers returned',
    type: GetOffersDto,
    isArray: true,
  })
  async getOffers(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const coachs = await this.queryBus.execute(new GetOffersQuery());
      return ApiController.ok(response, coachs);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Offer by Id' })
  @ApiResponse({
    status: 200,
    description: 'Offer returned',
    type: GetOffersDto,
  })
  async getCompanyById(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, GetOfferByIdDto> =
        await this.offersApplicationService.getById(id);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.ok(response, result);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create new Offer' })
  @ApiResponse({
    status: 201,
    description: 'Offer created',
    type: GetOffersDto,
  })
  async register(
    @Body() createOfferRequestDto: CreateOfferDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, CreateOfferResponseDto> =
        await this.offersApplicationService.register(createOfferRequestDto);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete offer by Id' })
  @ApiResponse({
    status: 202,
    description: 'Offer deleted',
  })
  async delete(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
    type: GetOffersDto,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, DeleteOfferResponseDto> =
        await this.offersApplicationService.delete(id);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
