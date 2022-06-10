export class UpdateCoachCommand {
    constructor(
      public readonly targetId: number,
      public readonly id: number,
      public readonly nameCompany: string,
      public readonly email: string,
      public readonly password: string,
      public readonly descriptionCoach: string,
      public readonly imgCoach: string,
    ) {}
  }