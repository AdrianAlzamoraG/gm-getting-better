import { ApiProperty } from '@nestjs/swagger';
export class GetOffersDto {
    @ApiProperty()
    public title: string;
    @ApiProperty()
    public description: string;
    @ApiProperty()
    public pricePerIndividualSession: number;
    @ApiProperty()
    public pricePerGroupSession: number;
    @ApiProperty()
    public typeMoney: string;
    @ApiProperty()
    public coachId: number;
    @ApiProperty()
    public statusPublication: boolean;
    @ApiProperty()
    public createdAt: string;
}