import { Parser } from './parser.interface';
import { z } from 'zod';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatAnthropic } from '@langchain/anthropic';
import { Logger } from '@nestjs/common';

type model = 'claude-3-haiku-20240307';

class AnthropicParser implements Parser {
  public model: model;
  private LLM: any;
  private schema: Zod.Schema;
  private logger: Logger;
  private systemPrompt: ChatPromptTemplate;

  constructor(model: model = 'claude-3-haiku-20240307') {
    this.logger = new Logger('AnthropicParser');

    this.schema = z.object({
      name: z.string().describe('The name of a person'),
      age: z.number().describe("The person's age").nullish(),
      typeOfWork: z
        .string()
        .describe(
          "The person's type of work. (office, remote, part-time, etc.)",
        )
        .nullish(),
      position: z.string().describe("The person's position"),
      salaryExpectation: z
        .number()
        .describe("The person's salary expectations")
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
            startDate: z
              .string()
              .describe("The person's start date of education"),
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
            duration: z
              .string()
              .describe("The person's duration of experience"),
            startDate: z
              .string()
              .describe("The person's start date of experience"),
            endDate: z.string().describe("The person's end date of experience"),
            description: z
              .string()
              .describe("The person's description of experience"),
          }),
        )
        .describe("The person's experience")
        .nullish(),
      languages: z
        .array(z.string())
        .describe("The person's languages")
        .nullish(),
    });

    this.LLM = new ChatAnthropic({
      model,
      temperature: 0,
    });

    this.systemPrompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        `You are an expert extraction algorithm.
        Only extract relevant information from the text.
        If you do not know the value of an attribute asked to extract, if scheme field type is number use "0" as default, if string then "null". Dont use next symbols <,/|: .`,
      ],

      ['human', '{text}'],
    ]);
  }

  async parse(text: string): Promise<object> {
    const chain = this.systemPrompt.pipe(
      this.LLM.withStructuredOutput(this.schema, { name: 'candidate' }),
    );

    const response = (await chain.invoke({
      text,
    })) as object;

    this.logger.log(response);

    return response;
  }
}

export { AnthropicParser };
