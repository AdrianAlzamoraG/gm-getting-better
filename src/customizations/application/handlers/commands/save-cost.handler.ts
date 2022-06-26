import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaveCost } from '../../commands/save-cost.command';
import { OfferTypeORM } from '../../../../offers/infrastructure/persistence/typeorm/entities/offerTypeORM';
import { Money } from '../../../../common/domain/value-objects/money.value';
import { Currency } from '../../../../common/domain/enums/currency.enum';
import { CustomizationTypeorm } from '../../../infrastructure/persistence/typeorm/entities/customization.typeorm';
import { Customization } from '../../../domain/entities/customization.entity';
import { CustomizationFactory } from '../../../domain/factories/customization.factory';
import { CustomizationType } from '../../../domain/enums/customization-type.enum';
import { CustomizationStatus } from '../../../domain/enums/customization.status.enum';
import { OfferId } from '../../../../offers/domain/value-objects/offer-id.value';
import { CustomizationMapper } from '../../mappers/customization.mapper';
import { CustomizationId } from '../../../domain/value-objects/customization-id.value';

@CommandHandler(SaveCost)
export class SaveCostHandler implements ICommandHandler<SaveCost> {
  constructor(
    @InjectRepository(OfferTypeORM)
    private offerRepository: Repository<OfferTypeORM>,
    @InjectRepository(CustomizationTypeorm)
    private customizationRepository: Repository<CustomizationTypeorm>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: SaveCost) {
    let customizationId = 0;
    const offerTitle: string = command.title.trim();
    const offerTypeORM: OfferTypeORM = await this.offerRepository
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .useTransaction(true)
      .where('title = :title')
      .setParameter('title', offerTitle)
      .getOne();
    if (offerTypeORM == null) {
      return customizationId;
    }
    const offerFromId: OfferId = OfferId.of(offerTypeORM.id);
    const amount: Money = Money.create(command.amount, Currency.SOLES);
    let customization: Customization = CustomizationFactory.createFrom(
      CustomizationType.COST,
      CustomizationStatus.SAVED,
      offerFromId,
      null,
      amount,
      null,
    );
    let customizationTypeorm: CustomizationTypeorm =
      CustomizationMapper.toTypeORM(customization);
    customizationTypeorm = await this.customizationRepository.save(
      customizationTypeorm,
    );
    if (customizationTypeorm == null) {
      return customizationId;
    }
    customizationId = Number(customizationTypeorm.id);
    customization.changeId(CustomizationId.of(customizationId));
    customization = this.publisher.mergeObjectContext(customization);
    customization.cost();
    customization.commit();
    return customizationId;
  }
}
