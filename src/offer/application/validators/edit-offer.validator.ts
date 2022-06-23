import { InjectRepository } from '@nestjs/typeorm';
import { OfferTypeORM } from '../../infrastructure/persistence/typeorm/entities/offer.typeorm';
import { Repository } from 'typeorm';
import { AppNotification } from '../../../common/application/app.notification';
import { EditOfferDto } from '../dtos/request/edit-offer-request.dto';

export class EditOfferValidator {
  constructor(
    @InjectRepository(OfferTypeORM)
    private announcementRepository: Repository<OfferTypeORM>,
  ) {}

  public async validate(
    targetId: number,
    editOfferRequestDto: EditOfferDto,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    const id: number = editOfferRequestDto.id;

    if (id == null) {
      notification.addError('Offer id is required', null);
    }

    const title: string = editOfferRequestDto.title.trim();

    if (title.length <= 0) {
      notification.addError('Offer title is required', null);
    }

    const description: string = editOfferRequestDto.description.trim();

    if (description.length <= 0) {
      notification.addError('Offer description is required', null);
    }

    const pricePerIndividualSession: number =
      editOfferRequestDto.pricePerIndividualSession;

    if (pricePerIndividualSession == 0) {
      notification.addError(
        'Offer pricePerIndividualSession is required',
        null,
      );
    }

    const pricePerGroupSession: number =
      editOfferRequestDto.pricePerGroupSession;

    if (pricePerGroupSession == 0) {
      notification.addError('Offer pricePerGroupSession is required', null);
    }

    const typeMoney: string = editOfferRequestDto.typeMoney.toString();

    if (typeMoney.length <= 0) {
      notification.addError('Offer typeMoney is required', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    return notification;
  }
}
