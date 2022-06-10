import { AggregateRoot } from '@nestjs/cqrs';
import { OfferRegisteredEvent } from '../events/offer-registered.event';
import { OfferId } from '../value-objects/offer-id.value';

export class Offer extends AggregateRoot {
  private id: OfferId;
  private title: string;
  private description: string;
  private pricePerIndividualSession: number;
  private pricePerGroupSession: number;
  private typeMoney: string;
  private coachId: number;
  private statusPublication: boolean;
  private createdAt: string;

  public constructor(
    id: OfferId,
    title: string,
    description: string,
    pricePerIndividualSession: number,
    pricePerGroupSession: number,
    typeMoney: string,
    coachId: number,
    statusPublication: boolean,
    createdAt: string,
  ) {
    super();
    this.id = id;
    this.title = title;
    this.description = description;
    this.pricePerIndividualSession = pricePerIndividualSession;
    this.pricePerGroupSession = pricePerGroupSession;
    this.typeMoney = typeMoney;
    this.coachId = coachId;
    this.statusPublication = statusPublication;
    this.createdAt = createdAt;
  }
  public register() {
    const event = new OfferRegisteredEvent(
      this.id.getValue(),
      this.title,
      this.description,
      this.pricePerIndividualSession,
      this.pricePerGroupSession,
      this.typeMoney,
      this.coachId,
      this.statusPublication,
      this.createdAt,
    );
    this.apply(event);
  }
  public getId(): OfferId {
    return this.id;
  }
  public getTitle(): string {
    return this.title;
  }
  public getDescription(): string {
    return this.description;
  }
  public getPricePerIndividualSession(): number {
    return this.pricePerIndividualSession;
  }
  public getPricePerGroupSession(): number {
    return this.pricePerGroupSession;
  }
  public getCoachId(): number {
    return this.coachId;
  }
  public getTypeMoney(): string {
    return this.typeMoney;
  }
  public getStatusPublication(): boolean {
    return this.statusPublication;
  }
  public getCreatedAt(): string {
    return this.createdAt;
  }
  public changeId(id: OfferId) {
    this.id = id;
  }
}
