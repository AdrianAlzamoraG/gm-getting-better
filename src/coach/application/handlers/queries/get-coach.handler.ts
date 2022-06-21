import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCoachQuery } from '../../queries/get-coach.query';
import { getManager } from 'typeorm';
import { GetCoachDto } from '../../dtos/queries/get-coach.dto';
import { GetApplicantsDto } from '../../../../applicants/application/dtos/queries/get-applicants.dto';

@QueryHandler(GetCoachQuery)
export class GetCoachHandler implements IQueryHandler<GetCoachQuery> {
  constructor() {}

  async execute(query: GetCoachQuery) {
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
    ORDER BY
        name_coach;  
    `;

    const ormCoach = await manager.query(sql);

    if (ormCoach.length <= 0) {
      return [];
    }

    const coach: GetCoachDto[] = ormCoach.map(function (
      ormCoach,
    ) {
      const coachDto = new GetCoachDto();
      coachDto.id = Number(ormCoach.id);
      coachDto.nameCoach = ormCoach.nameCoach;
      coachDto.email = ormCoach.email;
      coachDto.password = ormCoach.password;
      coachDto.descriptionCoach = ormCoach.descriptionCoach;
      coachDto.imgCoach = ormCoach.imgCoach;
      return coachDto;
    });

    return coach;
  }
}