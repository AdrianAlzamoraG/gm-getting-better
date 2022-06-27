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
exports.ActiveCoach = void 0;
var coach_state_1 = require("../abstract/coach-state");
var ActiveCoach = /** @class */ (function (_super) {
    __extends(ActiveCoach, _super);
    function ActiveCoach() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActiveCoach.prototype.handle = function () {
        console.log('ActiveCoach state handle');
        //this.coach.transitionTo(new InactiveCoach());
    };
    return ActiveCoach;
}(coach_state_1.CoachState));
exports.ActiveCoach = ActiveCoach;
