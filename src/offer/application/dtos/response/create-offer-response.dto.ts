export class CreateOfferResponseDto {
  constructor(
    public id: number,
    public readonly title: string,
    public readonly description: string,
    public readonly pricePerIndividualSession: number,
    public readonly pricePerGroupSession: number,
    public readonly typeMoney: string,
    public readonly coachId: number,
    public readonly statusPublication: boolean,
    public readonly createdAt: string,
  ) {}
}
