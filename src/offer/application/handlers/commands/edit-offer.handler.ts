import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EditOfferCommand } from '../../commands/edit-offer.command';
import { InjectRepository } from '@nestjs/typeorm';
import { OfferTypeORM } from 'src/offer/infrastructure/persistence/typeorm/entities/offer.typeorm';
import { Repository } from 'typeorm';
import { OfferId } from 'src/offer/domain/value-objects/offer-id.value';
import { OfferFactory } from 'src/offer/domain/factories/offer.factory';
import { Offer } from 'src/offer/domain/entities/offer.entity';
import { OfferMapper } from '../../mappers/offer.mapper';

@CommandHandler(EditOfferCommand)
export class EditOfferHandler implements ICommandHandler<EditOfferCommand> {
  constructor(
    @InjectRepository(OfferTypeORM)
    private offerRepository: Repository<OfferTypeORM>,
  ) {}

  async execute(command: EditOfferCommand) {
    const idResult: OfferId = OfferId.create(command.id);

    /*const organizationResult = CoachIdTypeORM.constructor(
      command.coachId,
    );*/

    const offer: Offer = OfferFactory.withId(
      idResult,
      command.title,
      command.description,
      command.pricePerIndividualSession,
      command.pricePerGroupSession,
      command.typeMoney,
      //  command.coachId,
      command.statusPublication,
      command.createdAt,
      // coachResult.value,
    );

    const offerTypeORM = OfferMapper.toTypeORM(offer);
    await this.offerRepository.update(command.targetId, offerTypeORM);

    return offerTypeORM;
  }
}
