import { CustomizationType } from './customization-type.enum';

export enum CustomizationStatus {
  SAVED = 1,
  COMPLETED = 2,
  FAILED = 3,
}

export const CustomizationStatusLabel = new Map<number, string>([
  [CustomizationStatus.SAVED, 'SAVED'],
  [CustomizationStatus.COMPLETED, 'COMPLETED'],
  [CustomizationStatus.FAILED, 'FAILED'],
]);
