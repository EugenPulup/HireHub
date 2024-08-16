import { Parser } from './parser.interface';
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

  constructor(model: model = 'claude-3-haiku-20240307', schema: Zod.Schema) {
    this.logger = new Logger('AnthropicParser');

    this.schema = schema;

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
