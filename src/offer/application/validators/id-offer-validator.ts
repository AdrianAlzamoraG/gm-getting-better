import { InjectRepository } from '@nestjs/typeorm';
import { OfferTypeORM } from '../../infrastructure/persistence/typeorm/entities/offer.typeorm';
import { Repository } from 'typeorm';
import { AppNotification } from '../../../common/application/app.notification';

export class IdOfferValidator {
  constructor(
    @InjectRepository(OfferTypeORM)
    private offerRepository: Repository<OfferTypeORM>,
  ) {}

  public async validate(id: number): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    if (id < 0) {
      notification.addError('The offer id must be a positive integer', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const offer: OfferTypeORM = await this.offerRepository.findOne(id);

    if (offer == null) {
      notification.addError(`There is no offer with id: ${id}`, null);
    }

    return notification;
  }
}
