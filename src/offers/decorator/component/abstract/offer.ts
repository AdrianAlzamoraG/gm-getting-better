// Component
export abstract class Offer {
  protected description: string;
  public abstract getDescription(): string;
  public abstract calculateCost(): number;
}
