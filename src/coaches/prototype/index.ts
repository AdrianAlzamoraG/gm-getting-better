import {Prototype} from "./prototype";
import {CircularReference} from "./circular-reference";
import { Coach } from "./coach";
import { CoachId } from "./coach-id";
import { CoachPreference } from './coach-preference';

function clientCode1() {
    
    const original: Prototype = new Prototype();
    original.primitive = 245;
    original.component = new Date();
    original.circularReference = new CircularReference(original);
    
    //const copy: Prototype = original.shallowCopy();
    
    const copy: Prototype = original.deepCopy();
    
    if (original === copy) {
        console.log('Same object reference.');
    } else {
        console.log('Different object reference.');
    }
    if (original.component === copy.component) {
        console.log('Simple component has NOT been cloned.');
    } else {
        console.log('Simple component has been cloned, different object reference.');
    }
    if (original.circularReference === copy.circularReference) {
        console.log('Component with back reference has NOT been cloned.');
    } else {
        console.log('Component with back reference has been cloned, different object reference.');
    }
    if (original.circularReference.prototype === copy.circularReference.prototype) {
        console.log('Component with back reference is linked to original object.');
    } else {
        console.log('Component with back reference is linked to the clone, different object reference.');
    }
}

function clientCode2() {
    const coachOriginalPrototype: Coach = new Coach();
    
    coachOriginalPrototype.id = new CoachId(1);
    coachOriginalPrototype.email = 'test@upc.edu.pe';
    coachOriginalPrototype.preference = 
        new CoachPreference(coachOriginalPrototype);
    
    //const coachCopy: Coach = coachOriginalPrototype.shallowCopy();
    
    const coachCopy: Coach = coachOriginalPrototype.deepCopy();
    
    if (coachOriginalPrototype === coachCopy)
        console.log('Original and Copy/Clone have the same memory address');
    else
        console.log('Original and Copy/Clone have different memory address');
    
    if (coachOriginalPrototype.id === coachCopy.id)
        console.log('Same memory address, the ID has not been cloned');
    else
        console.log('Different memory address, the ID has been cloned');
    
    if (coachOriginalPrototype.preference === coachCopy.preference)
        console.log('Same memory address, the preference has not been cloned');
    else
        console.log('Different memory address, the preference has been cloned');
    
    if (coachOriginalPrototype.preference.coach === coachCopy.preference.coach)
        console.log('Same memory address, the coach preference has not been cloned');
    else
        console.log('Different memory address, the coach preference has been cloned');
}

//clientCode1();
clientCode2();