export class AuthenticateCoachRequestDto {
    //authenticate
    constructor(
      public readonly email: string,
      public readonly password: string,
    ) {}
  }