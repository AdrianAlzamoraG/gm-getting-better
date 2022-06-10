import { CreateOfferValidator } from './application/validators/create-offer.validator';
import { IdOfferValidator } from './application/validators/id-offer-validator';
import { EditOfferValidator } from './application/validators/edit-offer.validator';
import { CreateOfferHandler } from './application/handlers/commands/create-offer.handler';
import { DeleteOfferHandler } from './application/handlers/commands/delete-offer.handler';
import { EditOfferHandler } from './application/handlers/commands/edit-offer.handler';
import { OffersApplicationService } from './application/services/offers-application.service';
import { OfferController } from './api/offer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { OfferTypeORM } from './infrastructure/persistence/typeorm/entities/offer.typeorm';
import { Module } from '@nestjs/common';

export const CommandHandlers = [
  CreateOfferHandler,
  DeleteOfferHandler,
  EditOfferHandler,
];
export const EventHandlers = [OfferCreatedHandler];
export const QueryHandlers = [GetOffersHandler, GetOfferByIdHandler];
export const Validators = [
  CreateOfferValidator,
  IdOfferValidator,
  EditOfferValidator,
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([OfferTypeORM, CoachTypeORM])],
  controllers: [OfferController],
  providers: [
    OffersApplicationService,
    ...Validators,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class OffersModule {}
