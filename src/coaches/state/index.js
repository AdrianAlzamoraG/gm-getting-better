"use strict";
exports.__esModule = true;
exports.Client = void 0;
var coach_1 = require("./context/coach");
var factory_1 = require("./factory/factory");
var coach_state_type_1 = require("./factory/coach-state-type");
var Client = /** @class */ (function () {
    function Client() {
    }
    Client.prototype.execute = function () {
        var coachState = factory_1.StateFactory.getConcreteState(coach_state_type_1.CoachStateType.ACTIVE);
        var coach = new coach_1.Coach(coachState);
        coach.request();
        coachState = factory_1.StateFactory.getConcreteState(coach_state_type_1.CoachStateType.INACTIVE);
        coach.transitionTo(coachState);
        coach.request();
    };
    return Client;
}());
exports.Client = Client;
var client = new Client();
client.execute();
