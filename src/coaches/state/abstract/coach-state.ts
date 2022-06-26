import { Coach } from '../context/coach';

export abstract class CoachState {
  protected coach: Coach;

  public setContext(coach: Coach) {
    this.coach = coach;
  }

  public abstract handle(): void;
}
