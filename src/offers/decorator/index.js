"use strict";
exports.__esModule = true;
var cyberMonday_1 = require("./decorator/concret/cyberMonday");
var givingTuesday_1 = require("./decorator/concret/givingTuesday");
var offer_factory_1 = require("./factory/offer-factory");
var offer_type_1 = require("./factory/offer-type");
function clientCode() {
    var offer = offer_factory_1.OfferFactory.getType(offer_type_1.OfferType.DUE);
    //offer = new BlackFriday(offer);
    //offer = new BlackFriday(offer);
    offer = new cyberMonday_1.CyberMonday(offer);
    offer = new givingTuesday_1.GivingTuesday(offer);
    console.log(offer.getDescription());
    console.log(offer.calculateCost());
}
clientCode();
