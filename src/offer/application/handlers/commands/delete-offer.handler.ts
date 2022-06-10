import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OfferTypeORM } from 'src/offer/infrastructure/persistence/typeorm/entities/offer.typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteOfferCommand } from '../../commands/delete-offer.command';

@CommandHandler(DeleteOfferCommand)
export class DeleteOfferHandler
  implements ICommandHandler<DeleteOfferCommand>
{
  constructor(
    @InjectRepository(OfferTypeORM)
    private offerRepository: Repository<OfferTypeORM>,
  ) {}

  async execute(command: DeleteOfferCommand) {
    const id = command.id;

    const offer = await this.offerRepository.findOne(id);
    await this.offerRepository.delete(id);

    return offer;
  }
}