import { Controller } from '@nestjs/common';

@Controller('offers')
export class OfferController {
  constructor(private readonly offerApplicationService: OfferApplica) {}
}
