import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { Repository } from 'typeorm';
import { OfferTypeORM } from '../../infrastructure/persistence/typeorm/entities/offerTypeORM';
import { OpenOfferRequest } from '../dtos/request/open-offer-request.dto';

@Injectable()
export class OpenOfferValidator {
  constructor(
    @InjectRepository(OfferTypeORM)
    private offerRepository: Repository<OfferTypeORM>,
  ) {}

  public async validate(
    openOfferRequestDto: OpenOfferRequest,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();
    const title: string = openOfferRequestDto.title.trim();
    if (title.length <= 0) {
      notification.addError('Offer title is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const offerTypeORM: OfferTypeORM = await this.offerRepository
      .createQueryBuilder()
      .where('title = :title', { title })
      .getOne();
    if (offerTypeORM != null) {
      notification.addError('Account number is taken', null);
    }
    return notification;
  }
}
