import { z } from 'zod';

export const schema = z.object({
  name: z.string().describe('The name of a person'),
  age: z.number().describe("The person's age").nullish(),
  workTime: z
    .enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'UNDEFINED'])
    .describe("The person's type of work.")
    .nullish(),
  workLocation: z
    .enum(['REMOTE', 'OFFICE', 'MIXED', 'UNDEFINED'])
    .describe("The person's type of work location.")
    .nullish(),
  position: z.string().describe("The person's position"),
  salary: z
    .number()
    .describe(
      "The person's salary expectations. Convert Salary from UAH to USD",
    )
    .nullish(),
  skills: z.array(z.string()).describe("The person's skills"),
  yearsOfExperience: z
    .number()
    .nullish()
    .describe('The person summary years of work experience'),
  location: z.string().describe("The person's location").nullish(),
  education: z
    .array(
      z.object({
        institution: z.string().describe("The person's institution"),
        fieldOfStudy: z.string().describe("The person's field of study"),
        level: z.string().describe("The person's level of education"),
        duration: z.string().describe("The person's duration of education"),
        startDate: z.string().describe("The person's start date of education"),
        endDate: z.string().describe("The person's end date of education"),
      }),
    )
    .describe("The person's education")
    .nullish(),
  experience: z
    .array(
      z.object({
        company: z.string().describe("The person's company"),
        position: z.string().describe("The person's position"),
        duration: z.string().describe("The person's duration of experience"),
        startDate: z.string().describe("The person's start date of experience"),
        endDate: z.string().describe("The person's end date of experience"),
        description: z
          .string()
          .describe("The person's description of experience"),
      }),
    )
    .describe("The person's experience")
    .nullish(),
  languages: z.array(z.string()).describe("The person's languages").nullish(),
});
