import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCoachCommand } from '../../commands/delete-coach.command';
import { InjectRepository } from '@nestjs/typeorm';
import { CoachTypeORM } from '../../../infrastructure/persistence/typeorm/entities/coach.typeorm';
import { Repository } from 'typeorm';

@CommandHandler(DeleteCoachCommand)
export class DeleteCoachHandler
  implements ICommandHandler<DeleteCoachCommand>
{
  constructor(
    @InjectRepository(CoachTypeORM)
    private coachRepository: Repository<CoachTypeORM>,
  ) {}

  async execute(command: DeleteCoachCommand) {
    const id = command.id;

    const coach = await this.coachRepository.findOne(id);
    await this.coachRepository.delete(id);

    return coach;
  }
}