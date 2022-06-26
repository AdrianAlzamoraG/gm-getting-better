import {CoachState} from "../abstract/coach-state";
import {InactiveCoach} from "./inactive-coach";

export class ActiveCoach extends CoachState {
    public handle(): void {
        console.log('ActiveCoach state handle');
        //this.coach.transitionTo(new InactiveCoach());
    }
}