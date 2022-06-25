import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { CostSaved } from '../../../../customizations/domain/events/cost-saved.event';

@EventsHandler(CostSaved)
export class CostSavedHandler implements IEventHandler<CostSaved> {
  constructor() {}

  async handle(event: CostSaved) {
    console.log('Coaches BC - handle Cost Saved');
  }
}
