import { GetCustomersOrganizationQuery } from '../../queries/get-customers-organization.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetCustomersOrganizationDto } from '../../dtos/queries/get-customers-organization.dto';

@QueryHandler(GetCustomersOrganizationQuery)
export class GetCustomersOrganizationHandler implements IQueryHandler<GetCustomersOrganizationQuery> {
  constructor() {}

  async execute(query: GetCustomersOrganizationQuery) {
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      organization_name as organizationName,
      ruc
    FROM 
      coaches
    WHERE
      type = 'C'
    ORDER BY
      organization_name;`;
    const ormCustomers = await manager.query(sql);
    if (ormCustomers.length <= 0) {
      return [];
    }
    const customers: GetCustomersOrganizationDto[] = ormCustomers.map(function (ormCustomer) {
      let customerDto = new GetCustomersOrganizationDto();
      customerDto.id = Number(ormCustomer.id);
      customerDto.organizationName = ormCustomer.organizationName;
      customerDto.ruc = ormCustomer.ruc;
      return customerDto;
    });
    return customers;
  }
}