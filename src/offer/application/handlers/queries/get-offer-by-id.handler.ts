import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOfferByIdQuery } from '../../queries/get-offer-by-id.query';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OfferTypeORM } from '../../../infrastructure/persistence/typeorm/entities/offer.typeorm';

@QueryHandler(GetOfferByIdQuery)
export class GetOfferByIdHandler implements IQueryHandler<GetOfferByIdQuery> {
  constructor(
    @InjectRepository(OfferTypeORM)
    private offerRepository: Repository<OfferTypeORM>,
  ) {}

  async execute(query: GetOfferByIdQuery) {
    const id = query.id;

    const offer: OfferTypeORM = await this.offerRepository.findOne(id);

    return offer;
  }
}
