"use strict";
exports.__esModule = true;
var cyberMonday_1 = require("./decorator/concret/cyberMonday");
var offer_factory_1 = require("./factory/offer-factory");
var offer_type_1 = require("./factory/offer-type");
function clientCode() {
    var offer = offer_factory_1.OfferFactory.getType(offer_type_1.OfferType.DUE);
    offer = new cyberMonday_1.CyberMonday(offer);
    //offer = new GivingTuesday(offer);
    console.log('shopping cart: \n', offer.getDescription());
    console.log('Precio final luego de aplicar descuentos', offer.calculateCost());
}
clientCode();
