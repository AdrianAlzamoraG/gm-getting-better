import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';

export class NameCoach {
  private readonly nameCoach: string;
  private static MAX_LENGTH = 30;

  private constructor(nameCoach: string) {
    this.nameCoach = nameCoach;

  }

  public getNameCoach(): string {
    return this.nameCoach;
  }

  public static create(
    nameCoach: string,
  ): Result<AppNotification, NameCoach> {
    const notification: AppNotification = new AppNotification();

    nameCoach = (nameCoach ?? '').trim();

    if (nameCoach === '') {
      notification.addError('firsName is required', null);
    }

    if (nameCoach.length > this.MAX_LENGTH) {
      notification.addError(
        `The maximum length of an firstName is ${this.MAX_LENGTH} characters including spaces`,
        null,
      );
    }

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    return Result.ok(new NameCoach(nameCoach));
  }
}