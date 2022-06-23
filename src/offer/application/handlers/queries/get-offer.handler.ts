import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOffersQuery } from '../../queries/get-offer-query';
import { getManager } from 'typeorm';
import { GetOffersDto } from '../../dtos/queries/get-offers.dto';

@QueryHandler(GetOffersQuery)
export class GetOffersHandler implements IQueryHandler<GetOffersQuery> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async execute(query: GetOffersQuery) {
    const manager = getManager();

    const sql = `
    SELECT 
        o.id,
        o.title,
        o.description,
        o.pricePerIndividualSession,
        o.pricePerGroupSession,
        o.typeMoney, 
        o.statusPublication,  
        o.created_at,
     
    FROM
        offers o
    ORDER BY
        o.created_at DESC;  
    `;

    const ormOffers = await manager.query(sql);

    if (ormOffers.length <= 0) {
      return [];
    }

    const Offers: GetOffersDto[] = ormOffers.map(function (ormOffer) {
      const offerDto = new GetOffersDto();
      offerDto.id = Number(ormOffer.id);
      offerDto.title = ormOffer.title;
      offerDto.description = ormOffer.description;
      offerDto.pricePerIndividualSession = ormOffer.pricePerIndividualSession;
      offerDto.pricePerGroupSession = ormOffer.pricePerGroupSession;
      offerDto.typeMoney = ormOffer.typeMoney;
      offerDto.statusPublication = ormOffer.statusPublication;
      // announcementDto.organizationId = ormAnnouncement.organizationId;
      return offerDto;
    });

    return Offers;
  }
}
