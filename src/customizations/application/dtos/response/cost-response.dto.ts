export class CostResponseDto {
  constructor(
    public readonly customizationId: number,
    public readonly customizationType: string,
    public readonly offerNumber: string,
    public readonly amount: number,
    public readonly status: string,
    public readonly createdAt: string,
  ) {}
}
