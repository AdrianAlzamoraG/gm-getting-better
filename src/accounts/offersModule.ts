import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { OfferTypeORM } from './infrastructure/persistence/typeorm/entities/offerTypeORM';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersController } from './api/offers.controller';
import { OfferOpenedHandler } from './application/handlers/events/offer-opened.handler';
import { OffersApplicationService } from './application/services/offers-application.service';
import { OpenOfferValidator } from './application/validators/open-offer-validator.service';
import { GetOffersHandler } from './application/handlers/queries/get-offers.handler';
import { GetOfferByIdHandler } from './application/handlers/queries/get-offer-by-id.handler';
import { CostSavedHandler } from './application/handlers/events/cost-saved.handler';
import { OpenOfferHandler } from './application/handlers/commands/open-offer.handler';
import { MoneyTransferService } from './domain/services/money-transfer.service';

export const CommandHandlers = [OpenOfferHandler];
export const EventHandlers = [OfferOpenedHandler, CostSavedHandler];
export const QueryHandlers = [GetOffersHandler, GetOfferByIdHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([OfferTypeORM])],
  controllers: [OffersController],
  providers: [
    OffersApplicationService,
    MoneyTransferService,
    OpenOfferValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class OffersModule {}
