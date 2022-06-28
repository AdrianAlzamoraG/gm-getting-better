import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoachesModule } from './coaches/coach.module';
import { OffersModule } from './offers/offersModule';
import { CustomizationsModule } from './customizations/customizations.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      url: process.env.GB_DDD_NEST_MYSQL,
      migrationsRun: true,
      logging: true,
      timezone: '+00:00',
      bigNumberStrings: false,
      entities: [
        process.env.ENVIRONMENT == 'prod' ?
          '**/infrastructure/persistence/typeorm/entities/*{.ts,.js}' :
          'dist/**/infrastructure/persistence/typeorm/entities/*{.ts,.js}'
      ],
      subscribers: [],
      migrations: [
        process.env.ENVIRONMENT == 'prod' ?
          'common/infrastructure/persistence/typeorm/migrations/*{.ts,.js}' :
          'dist/common/infrastructure/persistence/typeorm/migrations/*{.ts,.js}'
      ],
      migrationsTableName: "migrations"
    }),
    CoachesModule,
    OffersModule,
    CustomizationsModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
