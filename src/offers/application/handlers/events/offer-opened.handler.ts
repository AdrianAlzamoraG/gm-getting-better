import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { OfferOpened } from '../../../domain/events/offer-opened.event';

@EventsHandler(OfferOpened)
export class OfferOpenedHandler implements IEventHandler<OfferOpened> {
  constructor() {}

  async handle(event: OfferOpened) {
    console.log('handle logic for OfferOpened');
    console.log(event);
  }
}
