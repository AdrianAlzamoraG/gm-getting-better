import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { OrganizationRegistered } from '../../../domain/events/organization-registered.event';

@EventsHandler(OrganizationRegistered)
export class OrganizationRegisteredHandler implements IEventHandler<OrganizationRegistered> {
  constructor() {}

  async handle(event: OrganizationRegistered) {
    console.log('handle logic for OrganizationRegistered');
    console.log(event);
  }
}