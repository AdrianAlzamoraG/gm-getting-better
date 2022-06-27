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
exports.BlackFriday = void 0;
var offer_decorator_1 = require("../abstract/offer-decorator");
var BlackFriday = /** @class */ (function (_super) {
    __extends(BlackFriday, _super);
    function BlackFriday(offer) {
        var _this = _super.call(this, offer) || this;
        _this.description = 'BlackFriday (-$20.25)';
        return _this;
    }
    BlackFriday.prototype.getDescription = function () {
        return this.offer.getDescription() + ', ' + this.description;
    };
    BlackFriday.prototype.calculateCost = function () {
        return this.offer.calculateCost() - 20.25;
    };
    return BlackFriday;
}(offer_decorator_1.OfferDecorator));
exports.BlackFriday = BlackFriday;
