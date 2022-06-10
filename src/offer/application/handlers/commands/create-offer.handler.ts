import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfferTypeORM } from 'src/offer/infrastructure/persistence/typeorm/entities/offer.typeorm';
import { CreateOfferCommand } from '../../commands/create-offer.command';
import { OfferId } from 'src/offer/domain/value-objects/offer-id.value';
import { Offer } from 'src/offer/domain/entities/offer.entity';
import { OfferMapper } from '../../mappers/offer.mapper';
import { OfferFactory } from 'src/offer/domain/factories/offer.factory';

@CommandHandler(CreateOfferCommand)
export class CreateOfferHandler implements ICommandHandler<CreateOfferCommand> {
  constructor(
    @InjectRepository(OfferTypeORM)
    private offerRepository: Repository<OfferTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: CreateOfferCommand) {
    /*const companyResult= CompanyIdTypeORM.constructor(
      command.companyId,
    );*/

    let offer: Offer = OfferFactory.createFrom(
      //PENDIENTE DE IMPLEMENTAR FACTORY EN DOMAIN
      command.title,
      command.description,
      command.pricePerIndividualSession,
      command.pricePerGroupSession,
      command.typeMoney,
      command.coachId,
      command.statusPublication,
      command.createdAt,
    );

    let OfferTypeORM = OfferMapper.toTypeORM(offer);
    OfferTypeORM = await this.offerRepository.save(OfferTypeORM);

    if (OfferTypeORM == null) {
      return 0;
    }

    const offerId = Number(OfferTypeORM.id.value);
    offer.changeId(OfferId.create(offerId));

    offer = this.publisher.mergeObjectContext(offer);
    offer.register();
    offer.commit();

    return offerId;
  }
}
