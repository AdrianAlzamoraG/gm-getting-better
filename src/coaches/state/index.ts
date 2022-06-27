import { InactiveCoach } from './concrete/inactive-coach';
import { ActiveCoach } from './concrete/active-coach';
import { Coach } from './context/coach';
import { CoachState } from './abstract/coach-state';
import { StateFactory } from './factory/factory';
import { CoachStateType } from './factory/coach-state-type';

export class Client {
  public execute(): void {
    let coachState: CoachState = StateFactory.getConcreteState(
      CoachStateType.ACTIVE,
    );
    const coach = new Coach(coachState);
    coach.request();

    coachState = StateFactory.getConcreteState(CoachStateType.INACTIVE);
    coach.transitionTo(coachState);
    coach.request();
  }
}

const client: Client = new Client();
client.execute();
