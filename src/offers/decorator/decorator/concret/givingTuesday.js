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
exports.GivingTuesday = void 0;
var offer_decorator_1 = require("../abstract/offer-decorator");
var GivingTuesday = /** @class */ (function (_super) {
    __extends(GivingTuesday, _super);
    function GivingTuesday(offer) {
        var _this = _super.call(this, offer) || this;
        _this.description = 'GivingTuesday (-$10.50)';
        return _this;
    }
    GivingTuesday.prototype.getDescription = function () {
        return this.offer.getDescription() + ', ' + this.description;
    };
    GivingTuesday.prototype.calculateCost = function () {
        return this.offer.calculateCost() - 10.5;
    };
    return GivingTuesday;
}(offer_decorator_1.OfferDecorator));
exports.GivingTuesday = GivingTuesday;
