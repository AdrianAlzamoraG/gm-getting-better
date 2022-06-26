import { Coach } from './coach';

export class CoachPreference {
  public coach: Coach; // Object Reference

  constructor(coach: Coach) {
    this.coach = coach;
  }
}
