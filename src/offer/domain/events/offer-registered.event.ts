export class OfferRegisteredEvent {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public pricePerIndividualSession: number,
    public pricePerGroupSession: number,
    public typeMoney: string,
    public statusPublication: boolean,
    public createdAt: string,
  ) {}
}
