import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppNotification } from '../../../common/application/app.notification';
import { OfferTypeORM } from '../../infrastructure/persistence/typeorm/entities/offer.typeorm';

export class CreateOfferValidator {
  constructor(
    @InjectRepository(OfferTypeORM)
    private offerRepository: Repository<OfferTypeORM>,
    @InjectRepository(CoachTypeORM)
    private coachRepository: Repository<CoachTypeORM>,
  ) {}

  public async validate(
    createOfferRequestDto: CreateOfferDto,
    idCoach: number,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    const title: string = createOfferRequestDto.title.trim();

    if (title.length <= 0) {
      notification.addError('Offer title is required', null);
    }

    const description: string = createOfferRequestDto.description.trim();

    if (description.length <= 0) {
      notification.addError('Offer description is required', null);
    }

    const pricePerIndividualSession: number =
      createOfferRequestDto.pricePerIndividualSession;

    if (pricePerIndividualSession == 0) {
      notification.addError(
        'Offer pricePerIndividualSession is required',
        null,
      );
    }

    const pricePerGroupSession: number =
      createOfferRequestDto.pricePerGroupSession;

    if (pricePerGroupSession == 0) {
      notification.addError('Offer pricePerGroupSession is required', null);
    }

    const typeMoney: string = createOfferRequestDto.typeMoney.toString();

    if (typeMoney.length <= 0) {
      notification.addError('Offer typeMoney is required', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const coachId: number = idCoach;
    const coach: CoachTypeORM = await this.coachRepository
      .createQueryBuilder()
      .where('id = :coachId', { coachId })
      .getOne();

    if (coach == null) {
      notification.addError('Offer coachId is wrong', null);
    }

    return notification;
  }
}
