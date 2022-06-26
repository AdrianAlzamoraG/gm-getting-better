"use strict";
exports.__esModule = true;
var prototype_1 = require("./prototype");
var circular_reference_1 = require("./circular-reference");
var coach_1 = require("./coach");
var coach_id_1 = require("./coach-id");
var coach_preference_1 = require("./coach-preference");
function clientCode1() {
    var original = new prototype_1.Prototype();
    original.primitive = 245;
    original.component = new Date();
    original.circularReference = new circular_reference_1.CircularReference(original);
    //const copy: Prototype = original.shallowCopy();
    var copy = original.deepCopy();
    if (original === copy) {
        console.log('Same object reference.');
    }
    else {
        console.log('Different object reference.');
    }
    if (original.component === copy.component) {
        console.log('Simple component has NOT been cloned.');
    }
    else {
        console.log('Simple component has been cloned, different object reference.');
    }
    if (original.circularReference === copy.circularReference) {
        console.log('Component with back reference has NOT been cloned.');
    }
    else {
        console.log('Component with back reference has been cloned, different object reference.');
    }
    if (original.circularReference.prototype === copy.circularReference.prototype) {
        console.log('Component with back reference is linked to original object.');
    }
    else {
        console.log('Component with back reference is linked to the clone, different object reference.');
    }
}
function clientCode2() {
    var coachOriginalPrototype = new coach_1.Coach();
    coachOriginalPrototype.id = new coach_id_1.CoachId(1);
    coachOriginalPrototype.email = 'test@upc.edu.pe';
    coachOriginalPrototype.preference =
        new coach_preference_1.CoachPreference(coachOriginalPrototype);
    //const coachCopy: Coach = coachOriginalPrototype.shallowCopy();
    var coachCopy = coachOriginalPrototype.deepCopy();
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