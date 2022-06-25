import { CommandBus, IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { CostSaved } from '../../../../customizations/domain/events/cost-saved.event';
import { InjectRepository } from '@nestjs/typeorm';
import { OfferTypeORM } from '../../../infrastructure/persistence/typeorm/entities/offerTypeORM';
import { getManager, Repository } from 'typeorm';
import { OfferMapper } from '../../mappers/offerMapper';
import { Offer } from '../../../domain/entities/offer.entity';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { OfferTitle } from '../../../domain/value-objects/offer-title.value';
import { OfferFactory } from '../../../domain/factories/offer.factory';
import { Money } from '../../../../common/domain/value-objects/money.value';
import { Currency } from '../../../../common/domain/enums/currency.enum';
import { CoachId } from '../../../../coaches/domain/value-objects/coach-id.value';
import { OfferId } from '../../../domain/value-objects/offer-id.value';
import { CompleteCustomization } from '../../../../customizations/application/commands/complete-customization.command';

@EventsHandler(CostSaved)
export class CostSavedHandler implements IEventHandler<CostSaved> {
  constructor(
    @InjectRepository(OfferTypeORM)
    private offerRepository: Repository<OfferTypeORM>,
    private commandBus: CommandBus,
  ) {}

  async handle(event: CostSaved) {
    let offerTypeORM: OfferTypeORM = await this.offerRepository
      .createQueryBuilder()
      .where('id = :id')
      .setParameter('id', Number(event.offerIdFrom))
      .getOne();
    if (offerTypeORM == null) {
      console.log('MoneyDeposited offerTypeORM not found');
      return;
    }
    const offerTitleResult: Result<AppNotification, OfferTitle> =
      OfferTitle.create(offerTypeORM.title.value);
    if (offerTitleResult.isFailure()) {
      return;
    }
    const accountAmount: Money = Money.create(
      offerTypeORM.balance.balance,
      offerTypeORM.balance.currency,
    );
    const offer: Offer = OfferFactory.withId(
      OfferId.of(offerTypeORM.id),
      offerTitleResult.value,
      accountAmount,
      CoachId.of(offerTypeORM.coachId.value),
      null,
    );
    const depositAmount: Money = Money.create(event.amount, Currency.SOLES);
    const depositResult: Result<AppNotification, Offer> =
      offer.cost(depositAmount);
    if (depositResult.isFailure()) {
      console.log('MoneyDeposited error');
      return;
    }
    offerTypeORM = OfferMapper.toTypeORM(offer);
    await getManager().transaction(async (transactionalEntityManager) => {
      offerTypeORM = await this.offerRepository.save(offerTypeORM);
      if (offerTypeORM == null) {
        console.log('MoneyDeposited error');
        return;
      }
      const completeCustomization: CompleteCustomization = new CompleteCustomization(
        event.costumizationId,
      );
      await this.commandBus.execute(completeCustomization);
    });
  }
}
