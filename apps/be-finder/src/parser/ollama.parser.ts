import { Parser } from './parser.interface';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { OllamaFunctions } from '@langchain/community/experimental/chat_models/ollama_functions';
import { JsonOutputFunctionsParser } from '@langchain/core/output_parsers/openai_functions';
import { PromptTemplate } from '@langchain/core/prompts';
import { Logger } from '@nestjs/common';

const logger = new Logger('Scrapper');

type model = 'llama3' | 'mistrallite' | 'mistral' | 'gemma2' | 'nexusraven';

class OllamaParser implements Parser {
  public model: model;
  private LLM: any;
  private schema: Zod.Schema;
  private logger: Logger;
  private systemPrompt: PromptTemplate;

  constructor(model: model) {
    this.logger = new Logger('OllamaParser');

    this.schema = z.object({
      name: z.string().describe('The name of a person'),
      age: z.number().describe("The person's age"),
      workTime: z
        .enum(['Remote', 'Office', 'Hybrid'])
        .describe(
          "The person's type of work, which can be one of 'Remote', 'Office', or 'Hybrid'",
        ),
      position: z.string().describe("The person's position"),
      salary: z.number().describe("The person's salary expectations"),
      skills: z.array(z.string()).describe("The person's skills"),
      location: z.string().describe("The person's location"),
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
        .describe("The person's education"),
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
        .describe("The person's experience"),
      languages: z.array(z.string()).describe("The person's languages"),
    });

    this.LLM = new OllamaFunctions({
      baseUrl: 'http://host.docker.internal:11434',
      model,
      temperature: 0.1,
    }).bind({
      functions: [
        {
          name: 'information_extraction',
          description: 'Extract candidate data from resume text',
          parameters: {
            type: 'object',
            properties: zodToJsonSchema(this.schema),
          },
        },
      ],
      function_call: {
        name: 'information_extraction',
      },
    });

    this.systemPrompt = PromptTemplate.fromTemplate(` 
      Extract candidate data from a given resume text based on a predefined schema. If the model is unable to determine a value for a specific field, return 'null' for that field.
      
      Resume text: {input}`);
  }

  async parse(text: string): Promise<object> {
    const chain = await this.systemPrompt
      .pipe(this.LLM)
      .pipe(new JsonOutputFunctionsParser());

    const response = await chain.invoke({
      input: text,
    });

    logger.log(response);

    return response;
  }
}

export { OllamaParser };
