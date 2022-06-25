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
      accounts a
    ORDER BY
      a.created_at DESC;`;
    const ormAccounts = await manager.query(sql);
    if (ormAccounts.length <= 0) {
      return [];
    }
    const accounts: GetOffersDto[] = ormAccounts.map(function (ormAccount) {
      const accountDto = new GetOffersDto();
      accountDto.id = Number(ormAccount.id);
      accountDto.title = ormAccount.number;
      accountDto.balance = Number(ormAccount.balance);
      accountDto.coachId = Number(ormAccount.client_id);
      accountDto.createdAt = ormAccount.created_at;
      accountDto.createdBy = ormAccount.created_by;
      accountDto.updatedAt = ormAccount.updated_at;
      accountDto.updatedBy = ormAccount.updated_by;
      return accountDto;
    });
    return accounts;
  }
}
