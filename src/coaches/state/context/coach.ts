import { CoachState } from "../abstract/coach-state";

export class Coach {
    private state: CoachState;

    constructor(state: CoachState) {
        this.transitionTo(state);
    }

    public transitionTo(state: CoachState): void {
        console.log(`Context: Transition to ${(<any>state).constructor.name}.`);
        this.state = state;
        this.state.setContext(this);
    }

    public request(): void {
        this.state.handle();
    }
}