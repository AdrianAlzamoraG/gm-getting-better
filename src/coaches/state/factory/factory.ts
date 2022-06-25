import { CoachState } from "../abstract/coach-state";
import { CoachStateType } from "./coach-state-type";
import { ActiveCoach } from '../concrete/active-coach';
import { InactiveCoach } from "../concrete/inactive-coach";

export class StateFactory {
    // Factory Method
    public static getConcreteState(userStateType: CoachStateType): CoachState {
        if (coachStateType == CoachStateType.ACTIVE)
            return new ActiveCoach();

        if (coachStateType == CoachStateType.INACTIVE)
            return new InactiveCoach();
        
        return new ActiveCoach();
    }
}