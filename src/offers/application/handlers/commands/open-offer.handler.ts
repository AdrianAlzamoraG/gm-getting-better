import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { OpenOffer } from '../../commands/open-offer.command';
import { OfferTypeORM } from '../../../infrastructure/persistence/typeorm/entities/offerTypeORM';
import { OfferTitle } from '../../../domain/value-objects/offer-title.value';
import { Money } from '../../../../common/domain/value-objects/money.value';
import { Currency } from '../../../../common/domain/enums/currency.enum';
import { OfferFactory } from '../../../domain/factories/offer.factory';
import { Offer } from '../../../domain/entities/offer.entity';
import { OfferMapper } from '../../mappers/offerMapper';
import { CoachId } from '../../../../coach/domain/value-objects/coach-id.value';
import { OfferId } from '../../../domain/value-objects/offer-id.value';

@CommandHandler(OpenOffer)
export class OpenOfferHandler implements ICommandHandler<OpenOffer> {
  constructor(
    @InjectRepository(OfferTypeORM)
    private offerRepository: Repository<OfferTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: OpenOffer) {
    let offerId = 0;
    const offerTitleResult: Result<AppNotification, OfferTitle> =
      OfferTitle.create(command.title);
    if (offerTitleResult.isFailure()) {
      return offerId;
    }
    const balance: Money = Money.create(0, Currency.SOLES);
    const coachId: CoachId = CoachId.of(command.coachId);
    let offer: Offer = OfferFactory.createFrom(
      offerTitleResult.value,
      balance,
      coachId,
      null,
    );
    let offerTypeORM: OfferTypeORM = OfferMapper.toTypeORM(offer);
    offerTypeORM = await this.offerRepository.save(offerTypeORM);
    if (offerTypeORM == null) {
      return offerId;
    }
    offerId = Number(offerTypeORM.id);
    offer.changeId(OfferId.of(offerId));
    offer = this.publisher.mergeObjectContext(offer);
    offer.open();
    offer.commit();
    return offerId;
  }
}
