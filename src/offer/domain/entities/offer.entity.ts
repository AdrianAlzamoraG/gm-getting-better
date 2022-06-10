'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Offer = void 0;
const cqrs_1 = require('@nestjs/cqrs');
import { OfferRegisteredEvent } from '../events/offer-registered.event';
import { OfferId } from '../value-objects/offer-id.value';
const offer_registered_event_1 = require('../events/offer-registered.event');
export class Offer extends cqrs_1.AggregateRoot {
  /*
  private id: OfferId;
  private title: string;
  private description: string;
  private pricePerIndividualSession: number;
  private pricePerGroupSession: number;
  private typeMoney: string;
  // private coachId: number;
  private statusPublication: boolean;
  private createdAt: string;
*/

  constructor(
    id,
    title,
    description,
    pricePerIndividualSession,
    pricePerGroupSession,
    typeMoney,
    statusPublication,
    createdAt,
  ) {
    super();
    this.id = id;
    this.title = title;
    this.description = description;
    this.pricePerIndividualSession = pricePerIndividualSession;
    this.pricePerGroupSession = pricePerGroupSession;
    this.typeMoney = typeMoney;
    this.statusPublication = statusPublication;
    this.createdAt = createdAt;
  }
  register() {
    const event = new offer_registered_event_1.OfferRegisteredEvent(
      this.id.getValue(),
      this.title,
      this.description,
      this.pricePerIndividualSession,
      this.pricePerGroupSession,
      this.typeMoney,
      this.statusPublication,
      this.createdAt,
    );
    this.apply(event);
  }
  getId() {
    return this.id;
  }
  getTitle() {
    return this.title;
  }
  getDescription() {
    return this.description;
  }
  getPricePerIndividualSession() {
    return this.pricePerIndividualSession;
  }
  getPricePerGroupSession() {
    return this.pricePerGroupSession;
  }
  /* public getCoachId(): number {
    return this.coachId;
  }*/
  getTypeMoney() {
    return this.typeMoney;
  }
  getStatusPublication() {
    return this.statusPublication;
  }
  getCreatedAt() {
    return this.createdAt;
  }
  changeId(id) {
    this.id = id;
  }
}

exports.Offer = Offer;
