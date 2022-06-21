export class RegisterCoachRequestDto {
    constructor(
      public readonly nameCoach: string,
      public readonly email: string,
      public readonly password: string,
      public readonly descriptionCoach: string,
      public readonly imgCoach: string,
    ) {}
  }