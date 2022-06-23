export class RegisterCoachResponse {
  constructor(
    public id: number,
    public readonly name: string,
    public readonly ruc: string
  ) {}
}