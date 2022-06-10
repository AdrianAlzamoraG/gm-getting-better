export class CoachRegisteredEvent {
    constructor(
      public id: number,
      public email: string,
      public password: string,
      public nameCoach: string,     
    ) {}
  }