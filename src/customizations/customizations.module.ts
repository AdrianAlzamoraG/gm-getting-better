import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaveCostHandler } from './application/handlers/commands/save-cost.handler';
import { CustomizationsApplicationService } from './application/services/customizations-application.service';
import { CustomizationsController } from './api/customizations.controller';
import { SaveCostValidator } from './application/validators/save-cost-validator.service';
import { CustomizationTypeorm } from './infrastructure/persistence/typeorm/entities/customization.typeorm';
import { OfferTypeORM } from '../offers/infrastructure/persistence/typeorm/entities/offerTypeORM';
import { CostSavedHandler } from './application/handlers/events/cost-saved.handler';
import { CompleteCustomizationHandler } from './application/handlers/commands/complete-customization.handler';

export const CommandHandlers = [
  SaveCostHandler,
  CompleteCustomizationHandler,
];
export const EventHandlers = [CostSavedHandler];
export const QueryHandlers = [];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([CustomizationTypeorm, OfferTypeORM]),
  ],
  controllers: [CustomizationsController],
  providers: [
    CustomizationsApplicationService,
    SaveCostValidator,
    /* WithdrawMoneyValidator,
    TransferMoneyValidator,*/
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class CustomizationsModule {}
