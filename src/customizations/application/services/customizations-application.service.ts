import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
import { SaveCostValidator } from '../validators/save-cost-validator.service';
import { CostRequestDto } from '../dtos/request/cost-request.dto';
import { SaveCost } from '../commands/deposit-money.command';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import {
  CustomizationStatus,
  CustomizationStatusLabel,
} from '../../domain/enums/customization.status.enum';
import { CostResponseDto } from '../dtos/response/cost-response.dto';
/*import { WithdrawMoney } from '../commands/withdraw-money.command';

import { TransferMoney } from '../commands/transfer-money.command';*/
import { CustomizationType } from '../../domain/enums/customization-type.enum';

@Injectable()
export class CustomizationsApplicationService {
  constructor(
    private commandBus: CommandBus,
    private costValidator: SaveCostValidator,
  ) {}

  async cost(
    costRequestDto: CostRequestDto,
  ): Promise<Result<AppNotification, CostResponseDto>> {
    const notification: AppNotification = await this.costValidator.validate(
      costRequestDto,
    );
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const costMoney: SaveCost = new SaveCost(
      costRequestDto.title,
      costRequestDto.amount,
      CustomizationStatus.SAVED,
      DateTime.utcNow(),
    );
    const customizationId: number = await this.commandBus.execute(costMoney);
    const depositResponseDto: CostResponseDto = new CostResponseDto(
      customizationId,
      CustomizationType.COST,
      costRequestDto.title,
      costRequestDto.amount,
      CustomizationStatusLabel.get(CustomizationStatus.SAVED),
      null,
    );
    return Result.ok(depositResponseDto);
  }

  /*async withdraw(
    withdrawRequestDto: WithdrawRequestDto,
  ): Promise<Result<AppNotification, WithdrawResponseDto>> {
    const notification: AppNotification = await this.withdrawValidator.validate(
      withdrawRequestDto,
    );
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const withdrawCommand: WithdrawMoney = new WithdrawMoney(
      withdrawRequestDto.accountNumber,
      withdrawRequestDto.amount,
      CustomizationStatus.STARTED,
      DateTime.utcNow(),
    );
    const transactionId: number = await this.commandBus.execute(
      withdrawCommand,
    );
    const withdrawResponseDto: WithdrawResponseDto = new WithdrawResponseDto(
      transactionId,
      CustomizationType.WITHDRAW,
      withdrawRequestDto.accountNumber,
      withdrawRequestDto.amount,
      CustomizationStatusLabel.get(CustomizationStatus.STARTED),
      null,
    );
    return Result.ok(withdrawResponseDto);
  }

  async transfer(
    transferRequestDto: TransferRequestDto,
  ): Promise<Result<AppNotification, TransferResponseDto>> {
    const transferMoney: TransferMoney = new TransferMoney(
      transferRequestDto.fromAccountNumber,
      transferRequestDto.toAccountNumber,
      transferRequestDto.amount,
      CustomizationStatus.STARTED,
      DateTime.utcNow(),
    );
    const notification: AppNotification = await this.transferValidator.validate(
      transferMoney,
    );
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const transactionId: number = await this.commandBus.execute(transferMoney);
    const transferResponseDto: TransferResponseDto = new TransferResponseDto(
      transactionId,
      CustomizationType.TRANSFER,
      transferRequestDto.fromAccountNumber,
      transferRequestDto.toAccountNumber,
      transferRequestDto.amount,
      CustomizationStatusLabel.get(CustomizationStatus.STARTED),
      null,
    );
    return Result.ok(transferResponseDto);
  }*/
}
