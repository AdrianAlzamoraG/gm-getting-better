import { EventsHandler } from '@nestjs/cqrs/dist/utils/events-handler.decorator';
import { CoachRegisteredEvent } from '../../../domain/events/coach-registered.event';
import { IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CoachRegisteredEvent)
export class CoachRegisteredHandler
  implements IEventHandler<CoachRegisteredEvent>
{
  constructor() {}

  handle(event: CoachRegisteredEvent) {
    console.log(event);
  }
}