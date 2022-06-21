import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCoachByEmailQuery } from '../../queries/get-coach-by-email.query';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CoachTypeORM } from '../../../infrastructure/persistence/typeorm/entities/coach.typeorm';
import { EmailTypeORM } from '../../../../common/infrastructure/persistence/typeorm/entities/email.typeorm';
import { Coach } from '../../../domain/entities/coach.entity';
import { CoachMapper } from '../../mappers/coach.mapper';
import { getManager } from 'typeorm';
import { GetCoachByIdDto } from '../../dtos/queries/get-coach-by-id.dto';
import { GetCoachDto } from '../../dtos/queries/get-coach.dto';

@QueryHandler(GetCoachByEmailQuery)
export class GetCoachByEmailHandler
  implements IQueryHandler<GetCoachByEmailQuery>
{
  constructor(
    @InjectRepository(CoachTypeORM)
    private coachRepository: Repository<CoachTypeORM>,
  ) {}

  async execute(query: GetCoachByEmailQuery) {

    /*const emails = query.email;
    const coach:CoachTypeORM = await this.coachRepository.findOne(
      {where:{email:emails}}
    );*/
    const manager = getManager();
    const sql = `
    SELECT 
        id,
        name_coach as nameCoach,
        description_coach as descriptionCoach,
        img_coach as imgCoach,
        email,
        password
    FROM
        coach
    WHERE
        email=?;  
    `;
    const ormCoach = await manager.query(sql, [query.email]);
    if (ormCoach.length <= 0) {
      return {};
    }
    const ormCoach = ormCoach[0];
    const coachDto = new GetCoachDto();
    coachDto.id=Number(ormCoach.id);
    coachDto.nameCoach=ormCoach.nameCoach;
    coachDto.email=ormCoach.email;
    coachDto.password=ormCoach.password;
    coachDto.descriptionCoach=ormCoach.descriptionCoach;
    coachDto.imgCoach=ormCoach.imgCoach;
    return coachDto;
  }
}