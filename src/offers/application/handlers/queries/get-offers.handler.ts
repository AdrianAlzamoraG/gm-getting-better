import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetOffersQuery } from '../../queries/get-offers.query';
import { GetOffersDto } from '../../dtos/queries/get-offers.dto';

@QueryHandler(GetOffersQuery)
export class GetOffersHandler implements IQueryHandler<GetOffersQuery> {
  constructor() {}

  async execute(query: GetOffersQuery) {
    const manager = getManager();
    const sql = `
    SELECT
      a.id,
      a.number,
      a.balance,
      a.client_id,
      a.created_at,
      a.created_by,
      a.updated_at,
      a.updated_by
    FROM 
      offers a
    ORDER BY
      a.created_at DESC;`;
    const ormOffers = await manager.query(sql);
    if (ormOffers.length <= 0) {
      return [];
    }
    const offers: GetOffersDto[] = ormOffers.map(function (ormOffer) {
      const offerDto = new GetOffersDto();
      offerDto.id = Number(ormOffer.id);
      offerDto.title = ormOffer.number;
      offerDto.balance = Number(ormOffer.balance);
      offerDto.coachId = Number(ormOffer.client_id);
      offerDto.createdAt = ormOffer.created_at;
      offerDto.createdBy = ormOffer.created_by;
      offerDto.updatedAt = ormOffer.updated_at;
      offerDto.updatedBy = ormOffer.updated_by;
      return offerDto;
    });
    return offers;
  }
}
