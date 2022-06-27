"use strict";
exports.__esModule = true;
exports.OfferFactory = void 0;
var offer_type_1 = require("./offer-type");
var individual_offer_1 = require("../component/concret/individual-offer");
var due_offer_1 = require("../component/concret/due-offer");
var group_offer_1 = require("../component/concret/group-offer");
var OfferFactory = /** @class */ (function () {
    function OfferFactory() {
    }
    // Factory Method
    OfferFactory.getType = function (offerType) {
        if (offerType == offer_type_1.OfferType.INDIVIDUAL) {
            return new individual_offer_1.IndividualOffer();
        }
        if (offerType == offer_type_1.OfferType.DUE) {
            return new due_offer_1.DueOffer();
        }
        if (offerType == offer_type_1.OfferType.GROUP) {
            return new group_offer_1.GroupOffer();
        }
    };
    return OfferFactory;
}());
exports.OfferFactory = OfferFactory;
