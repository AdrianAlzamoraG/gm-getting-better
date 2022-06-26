import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { Repository } from 'typeorm';
import { CostRequestDto } from '../dtos/request/cost-request.dto';
import { OfferTypeORM } from '../../../offers/infrastructure/persistence/typeorm/entities/offerTypeORM';

@Injectable()
export class SaveCostValidator {
  constructor(
    @InjectRepository(OfferTypeORM)
    private offerRepository: Repository<OfferTypeORM>,
  ) {}

  public async validate(
    costRequestDto: CostRequestDto,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();
    const title: string = costRequestDto.title.trim();
    if (title.length <= 0) {
      notification.addError('Offer title is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const offerTypeORM: OfferTypeORM = await this.offerRepository
      .createQueryBuilder()
      .where('title = :title')
      .setParameter('title', title)
      .getOne();
    if (offerTypeORM == null) {
      notification.addError('Offer title not found', null);
    }
    const amount: number = costRequestDto.amount;
    if (amount <= 0) {
      notification.addError('Amount must be greater than zero', null);
    }

    return notification;
  }
}
