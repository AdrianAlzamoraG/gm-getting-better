import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoachesModule } from './coaches/coach.module';
import { OffersModule } from './offers/offersModule';
import { CustomizationsModule } from './customizations/customizations.module';

@Module({
  imports: [
    CoachesModule,
    OffersModule,
    CustomizationsModule,
    TypeOrmModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
