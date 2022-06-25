export class OfferOpened {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly coachId: number,
  ) {}
}
