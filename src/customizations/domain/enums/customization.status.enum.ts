import { CustomizationType } from './customization-type.enum';

export enum CustomizationStatus {
  SAVED = 1,
}

export const CustomizationStatusLabel = new Map<number, string>([
  [CustomizationStatus.SAVED, 'SAVED'],
]);
