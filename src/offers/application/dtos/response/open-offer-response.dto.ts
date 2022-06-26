export class OpenOfferResponse {
  constructor(
    public id: number,
    public title: string,
    public balance: number,
    public createdAt: string,
    public createdBy: number,
    public updatedAt: string,
    public updatedBy: number,
    public coachId: number,
  ) {}
}
