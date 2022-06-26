import { CoachId } from "./coach-id";
import { CoachPreference } from "./coach-preference";

export class Coach {
    public id: CoachId; // Object Reference
    public email: string; // Primitive
    public preference: CoachPreference; // Object Reference

    public shallowCopy(): this {
        const clone = Object.create(this);
        return clone;
    }

    public deepCopy(): this {
        const clone = Object.create(this);
        clone.id = Object.create(this.id);
        clone.preference = Object.create(this.preference);
        clone.preference.coach = Object.create(this.preference.coach);

        /*clone.preference = {
            ...this.preference,
            coach: { ...this },
        };*/

        return clone;
    }
}