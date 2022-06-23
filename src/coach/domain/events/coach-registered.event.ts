import { CustomerRegistered } from './customer-registered.event';

export class CoachRegistered extends CustomerRegistered {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly ruc: string,
  ) {
    super(id);
  }
}