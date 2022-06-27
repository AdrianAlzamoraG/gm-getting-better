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
exports.OfferDecorator = void 0;
var offer_1 = require("../../component/abstract/offer");
var OfferDecorator = /** @class */ (function (_super) {
    __extends(OfferDecorator, _super);
    function OfferDecorator(offer) {
        var _this = _super.call(this) || this;
        _this.offer = offer;
        return _this;
    }
    OfferDecorator.prototype.getDescription = function () {
        return this.offer.getDescription();
    };
    OfferDecorator.prototype.calculateCost = function () {
        return this.offer.calculateCost();
    };
    return OfferDecorator;
}(offer_1.Offer));
exports.OfferDecorator = OfferDecorator;
