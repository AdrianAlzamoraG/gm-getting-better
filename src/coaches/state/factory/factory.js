"use strict";
exports.__esModule = true;
exports.StateFactory = void 0;
var coach_state_type_1 = require("./coach-state-type");
var active_coach_1 = require("../concrete/active-coach");
var inactive_coach_1 = require("../concrete/inactive-coach");
var StateFactory = /** @class */ (function () {
    function StateFactory() {
    }
    // Factory Method
    StateFactory.getConcreteState = function (coachStateType) {
        if (coachStateType == coach_state_type_1.CoachStateType.ACTIVE)
            return new active_coach_1.ActiveCoach();
        if (coachStateType == coach_state_type_1.CoachStateType.INACTIVE)
            return new inactive_coach_1.InactiveCoach();
        return new active_coach_1.ActiveCoach();
    };
    return StateFactory;
}());
exports.StateFactory = StateFactory;