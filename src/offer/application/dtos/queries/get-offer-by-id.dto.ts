export class GetOfferByIdDto {
  public id: number;
  public title: string;
  public description: string;
  public pricePerIndividualSession: number;
  public pricePerGroupSession: number;
  public typeMoney: string;
  public coachId: number;
  public statusPublication: boolean;
  public createdAt: string;
}
