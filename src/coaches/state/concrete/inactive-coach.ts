import { CoachState } from '../abstract/coach-state';
import { ActiveCoach } from './active-coach';

export class InactiveCoach extends CoachState {
  public handle(): void {
    console.log('InactiveCoach state handle');
    //this.coach.transitionTo(new ActiveCoach());
  }
}
