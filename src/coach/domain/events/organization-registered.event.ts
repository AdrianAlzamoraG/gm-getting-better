import { CustomerRegistered } from './customer-registered.event';

export class OrganizationRegistered extends CustomerRegistered {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly ruc: string,
  ) {
    super(id);
  }
}
