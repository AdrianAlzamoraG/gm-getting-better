import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetOffersDto } from '../../dtos/queries/get-offers.dto';
import { GetOfferByIdQuery } from '../../queries/get-offer-by-id.query';

@QueryHandler(GetOfferByIdQuery)
export class GetOfferByIdHandler implements IQueryHandler<GetOfferByIdQuery> {
  constructor() {}

  async execute(query: GetOfferByIdQuery) {
    const manager = getManager();
    const sql = `
    SELECT
      a.id,
      a.title,
      a.balance,
      a.coach_id,
      a.created_at,
      a.created_by,
      a.updated_at,
      a.updated_by
    FROM 
      offers o
    WHERE
      o.id = ?;`;
    const ormOffers = await manager.query(sql, [query.offerId]);
    if (ormOffers.length <= 0) {
      return {};
    }
    const ormOffer = ormOffers[0];
    const offerDto = new GetOffersDto();
    offerDto.id = Number(ormOffer.id);
    offerDto.title = ormOffer.title;
    offerDto.balance = Number(ormOffer.balance);
    offerDto.coachId = Number(ormOffer.client_id);
    offerDto.createdAt = ormOffer.created_at;
    offerDto.createdBy = ormOffer.created_by;
    offerDto.updatedAt = ormOffer.updated_at;
    offerDto.updatedBy = ormOffer.updated_by;
    return offerDto;
  }
}
