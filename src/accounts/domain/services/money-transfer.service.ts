import { Offer } from '../entities/offer.entity';
import { Money } from '../../../common/domain/value-objects/money.value';
import { Result } from 'typescript-result';
import { AppNotification } from 'src/common/application/app.notification';

export class MoneyTransferService {
  public transfer(fromAccount: Offer, toOffer: Offer, amount: Money): boolean {
    const costResult: Result<AppNotification, Offer> = toOffer.cost(amount);
    if (costResult.isFailure()) {
      console.log('MoneyTransferred error');
      return false;
    }
    return true;
  }
}
