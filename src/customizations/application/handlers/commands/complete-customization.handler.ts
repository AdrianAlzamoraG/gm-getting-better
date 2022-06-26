import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomizationTypeorm } from '../../../infrastructure/persistence/typeorm/entities/customization.typeorm';
import { CustomizationStatus } from '../../../domain/enums/customization.status.enum';
import { CompleteCustomization } from '../../commands/complete-customization.command';

@CommandHandler(CompleteCustomization)
export class CompleteCustomizationHandler
  implements ICommandHandler<CompleteCustomization>
{
  constructor(
    @InjectRepository(CustomizationTypeorm)
    private customizationRepository: Repository<CustomizationTypeorm>,
  ) {}

  async execute(command: CompleteCustomization) {
    const customizationId: number = command.customizationId;
    let customizationTypeORM: CustomizationTypeorm =
      await this.customizationRepository
        .createQueryBuilder()
        .where('id = :id')
        .setParameter('id', customizationId)
        .getOne();
    if (customizationTypeORM == null) return false;

    customizationTypeORM.status = CustomizationStatus.SAVED;
    customizationTypeORM = await this.customizationRepository.save(
      customizationTypeORM,
    );
    if (customizationTypeORM == null) return false;

    return true;
  }
}
