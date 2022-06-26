import { Module } from '@nestjs/common';
import { CoachesController } from './api/coaches.controller';
import { OrganizationApplicationService } from './application/services/organization-application.service';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterPersonValidator } from './application/validators/register-person.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterOrganizationHandler } from './application/handlers/commands/register-organization.handler';
import { PersonRegisteredHandler } from './application/handlers/events/person-registered.handler';
import { GetCustomersPersonHandler } from './application/handlers/queries/get-customers-person.handler';
import { PersonApplicationService } from './application/services/person-application.service';
import { RegisterOrganizationValidator } from './application/validators/register-organization.validator';
import { RegisterPersonHandler } from './application/handlers/commands/register-person.handler';
import { OrganizationTypeORM } from './infrastructure/persistence/typeorm/entities/organization.typeorm';
import { PersonTypeORM } from './infrastructure/persistence/typeorm/entities/person.typeorm';
import { CoachTypeORM } from './infrastructure/persistence/typeorm/entities/coach.typeorm';
import { OrganizationRegisteredHandler } from './application/handlers/events/organization-registered.handler';
import { GetCustomersOrganizationHandler } from './application/handlers/queries/get-customers-organization.handler';
import { CostSavedHandler } from './application/handlers/events/cost-saved.handler';

export const CommandHandlers = [
  RegisterPersonHandler,
  RegisterOrganizationHandler,
];
export const EventHandlers = [
  PersonRegisteredHandler,
  OrganizationRegisteredHandler,
  CostSavedHandler,
];
export const QueryHandlers = [
  GetCustomersPersonHandler,
  GetCustomersOrganizationHandler,
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      CoachTypeORM,
      PersonTypeORM,
      OrganizationTypeORM,
    ]),
  ],
  exports: [TypeOrmModule],
  controllers: [CoachesController],
  providers: [
    PersonApplicationService,
    OrganizationApplicationService,
    RegisterPersonValidator,
    RegisterOrganizationValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class CoachesModule {}
