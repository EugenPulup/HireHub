import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  ValidateNested,
  IsDate,
} from 'class-validator';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateCandidateInput {
  @IsString()
  name: string;

  @IsString()
  campaignId: string;

  @IsNumber()
  age: number;

  @IsString()
  workTime: string;

  @IsString()
  workLocation: string;

  @IsString()
  position: string;

  @IsNumber()
  salary?: number;

  @IsNumber()
  yearsOfExperience?: number;

  @IsOptional()
  @IsString()
  location: string;

  createdAt: string;
}
