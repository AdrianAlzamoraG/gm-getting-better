export class RegisterUserCommand {
    constructor(
      public readonly firstName: string,
      public readonly lastName: string,
      public readonly dni: string,
      public readonly email: string,
      public readonly password: string,
    ) {}
  }