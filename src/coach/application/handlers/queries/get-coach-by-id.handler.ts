import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCoachByIdQuery } from '../../queries/get-coach-by-id.query';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CoachTypeORM } from '../../../infrastructure/persistence/typeorm/entities/coach.typeorm';

@QueryHandler(GetCoachByIdQuery)
export class GetCoachByIdHandler
  implements IQueryHandler<GetCoachByIdQuery>
{
  constructor(
    @InjectRepository(CoachTypeORM)
    private coachRepository: Repository<CoachTypeORM>,
  ) {}

  async execute(query: GetCoachByIdQuery) {
    const id = query.id;

    const coach: CoachTypeORM = await this.coachRepository.findOne(
      id,
    );

    return coach;
  }
}