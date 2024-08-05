import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

class EducationDTO {
  @IsString()
  institution: string;

  @IsString()
  fieldOfStudy: string;

  @IsString()
  level: string;

  @IsString()
  duration: string;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;
}

class ExperienceDTO {
  @IsString()
  company: string;

  @IsString()
  position: string;

  @IsString()
  duration: string;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsString()
  description: string;
}

export class CreateCandidateInput {
  @IsString()
  name: string;

  @IsString()
  campaignId: string;

  @IsNumber()
  age: number;

  @IsString()
  typeOfWork: string;

  @IsString()
  position: string;

  @IsNumber()
  @IsOptional()
  salaryExpectation?: number;

  @IsNumber()
  @IsOptional()
  yearsOfExperience?: number;

  @IsArray()
  @IsString({ each: true })
  skills: string[];

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDTO)
  education?: EducationDTO[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceDTO)
  experience?: ExperienceDTO[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languages?: string[];
}
