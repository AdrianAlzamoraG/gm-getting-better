import { OfferTypeorm } from '../../infrastructure/persistence/typeorm/entities/offer.typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from '../../../common/application/app.notification';

export class IdOfferValidator {
  constructor(
    @InjectRepository(OfferTypeorm)
    private offerRepository: Repository<OfferTypeorm>,
  ) {}

  public async validate(id: number): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    if (id < 0) {
      notification.addError('The offer id must be a positive integer', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const offer: OfferTypeorm = await this.offerRepository.findOne(id);

    if (offer == null) {
      notification.addError(`There is no offer with id: ${id}`, null);
    }

    return notification;
  }
}
