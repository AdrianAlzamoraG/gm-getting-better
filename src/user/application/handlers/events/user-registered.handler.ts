import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserRegisteredEvent } from '../../../domain/events/user-registered.event';

@EventsHandler(UserRegisteredEvent)
export class UserRegisteredHandler
  implements IEventHandler<UserRegisteredEvent>
{
  constructor() {}

  handle(event: UserRegisteredEvent) {
    console.log('handle logic for UserRegisteredEvent');
    console.log(event);
  }
}
