"use strict";
exports.__esModule = true;
exports.Coach = void 0;
var Coach = /** @class */ (function () {
    function Coach(state) {
        this.transitionTo(state);
    }
    Coach.prototype.transitionTo = function (state) {
        console.log("Context: Transition to ".concat(state.constructor.name, "."));
        this.state = state;
        this.state.setContext(this);
    };
    Coach.prototype.request = function () {
        this.state.handle();
    };
    return Coach;
}());
exports.Coach = Coach;