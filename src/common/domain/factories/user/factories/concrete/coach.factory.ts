import { Coach } from '../../../../../../coach/domain/entities/coach.entity';
import { CoachId } from '../../../../../../coach/domain/value-objects/coach-id.value';
import { UserAbstractFactory } from '../abstract/user-abstract.factory';
import { CreateFromParams } from '../params/create-from.params';
import { WithIdParams } from '../params/with-id.params';

export class CoachFactory extends UserAbstractFactory {
  public createFrom(params: CreateFromParams): Coach {
    return new Coach(
      CoachId.create(0),
      params.nameCoach,
      params.email,
      params.password,
      params.descriptionCoach,
      params.imgCoach,
    );
  }

  public withId(params: WithIdParams): Coach {
    return new Coach(
      params.companyId,
      params.nameCompany,
      params.email,
      params.password,
      params.descriptionCoach,
      params.imgCoach,
    );
  }