import { InputType, Field, registerEnumType } from '@nestjs/graphql';

enum Fields {
  yearsOfExperience = 'yearsOfExperience',
  salary = 'salary',
  age = 'age',
  workTime = 'workTime',
  workLocation = 'workLocation',
  position = 'position',
}

registerEnumType(Fields, {
  name: 'Fields',
});

@InputType()
export class GroupAnalyticInput {
  @Field(() => Fields, { nullable: false })
  field: Fields;
}
