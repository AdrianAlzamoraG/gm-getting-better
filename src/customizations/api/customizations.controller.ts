import { Controller, Post, Body, Res, Get, Patch, Param } from '@nestjs/common';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { CustomizationsApplicationService } from '../application/services/customizations-application.service';
import { CostRequestDto } from '../application/dtos/request/cost-request.dto';
import { CostResponseDto } from '../application/dtos/response/cost-response.dto';

@Controller('customizations')
export class CustomizationsController {
  constructor(
    private readonly customizationsApplicationService: CustomizationsApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('/cost')
  async cost(
    @Body() costRequestDto: CostRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, CostResponseDto> =
        await this.customizationsApplicationService.cost(costRequestDto);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
