"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.InactiveCoach = void 0;
var coach_state_1 = require("../abstract/coach-state");
var InactiveCoach = /** @class */ (function (_super) {
    __extends(InactiveCoach, _super);
    function InactiveCoach() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InactiveCoach.prototype.handle = function () {
        console.log('InactiveCoach state handle');
        //this.coach.transitionTo(new ActiveCoach());
    };
    return InactiveCoach;
}(coach_state_1.CoachState));
exports.InactiveCoach = InactiveCoach;
