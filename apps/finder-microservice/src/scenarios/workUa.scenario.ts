import type { Browser } from 'puppeteer';
import { OllamaFunctions } from 'langchain/experimental/chat_models/ollama_functions';
import { createExtractionChainFromZod } from 'langchain/chains';
import { z } from 'zod';
// import { Ollama } from 'ollama-node';
import { Ollama } from 'ollama';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { fetch } from 'undici';
import OpenAI from 'openai';
class WorkUAScenario {
  private EXTRACTION_TEMPLATE: string;
  private schema: z.ZodObject<any, any, any>;
  private browser: Browser;
  private config: { name: string };

  constructor(browser: Browser, config: { name: string }) {
    this.EXTRACTION_TEMPLATE = `You are an expert extraction data from resume algorithm. Only extract relevant information from the text.If you do not know the value of an attribute asked to extract,return null for the attribute's value.`;

    this.schema = z.object({
      name: z.string().describe('The name of a person'),
      age: z.number().describe("The person's age"),
      type_of_work: z
        .string()
        .describe(
          "The person's type of work. (office, remote, part-time, etc.)",
        ),
      position: z.string().describe("The person's position"),
      salary_expectation: z
        .number()
        .describe("The person's salary expectations"),
      skills: z.array(z.string()).describe("The person's skills"),
      location: z.optional(z.string()).describe("The person's location"),
      education: z
        .object({
          institution: z.string().describe("The person's institution"),
          field_of_study: z.string().describe("The person's field of study"),
          level: z.string().describe("The person's level of education"),
          duration: z.string().describe("The person's duration of education"),
          start_date: z
            .string()
            .describe("The person's start date of education"),
          end_date: z.string().describe("The person's end date of education"),
        })
        .describe("The person's education"),
      experience: z
        .object({
          company: z.string().describe("The person's company"),
          position: z.string().describe("The person's position"),
          duration: z.string().describe("The person's duration of experience"),
          start_date: z
            .string()
            .describe("The person's start date of experience"),
          end_date: z.string().describe("The person's end date of experience"),
          description: z
            .string()
            .describe("The person's description of experience"),
        })
        .describe("The person's experience"),
      languages: z
        .optional(z.array(z.string()))
        .describe("The person's languages"),
    });
    this.browser = browser;
    this.config = config;
  }

  static async scrapPagesList(
    browser: Browser,
    keyword: string,
  ): Promise<string[]> {
    let lastPage = false;
    let pageNumber = 1;
    let list: string[] = [];

    const page = await browser.newPage();

    // while (!lastPage) {
    try {
      await page.goto(
        `https://www.work.ua/ru/resumes-${keyword}/?page=${pageNumber++}`,
        { timeout: 5000 },
      );

      await page.waitForSelector('#pjax-resume-list', { timeout: 5000 });

      const resumes = await page.$$('#pjax-resume-list>.card.card-hover');

      for (const resume of resumes) {
        try {
          const detailHref: string = await resume.$eval(
            'h2>a',
            (element) => element.href,
          );

          list.push(detailHref);
        } catch (error) {
          continue;
        }
      }
    } catch (error) {
      console.error('Error:', error);
      lastPage = true;
    }

    return list.filter(Boolean);
  }

  static async scrapDetailPage(url: string, browser: Browser) {
    const page = await browser.newPage();
    await page.goto(url);

    await page.waitForSelector('.add-top');

    const text = await page.$eval('.card.wordwrap.cut-top', (element) =>
      element.textContent
        .replace(/(<([^>]+)>)/gi, '')
        .replaceAll(/\s\s+/g, ' ')
        .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''),
    );

    return text;
  }

  async parseWithAI(): Promise<object[]> {
    const listOfTargets = await WorkUAScenario.scrapPagesList(
      this.browser,
      this.config.name,
    );

    const ollama = new Ollama();

    const schema = {
      name: {
        type: 'string',
        description: 'The name of a person',
      },
      age: {
        type: 'number',
        description: "The person's age",
      },
      type_of_work: {
        type: 'string',
        description:
          "The person's type of work. (office, remote, part-time, etc.)",
      },
      position: {
        type: 'string',
        description:
          "The person's position. example (Senior, Middle, Strong-Junior, etc.)",
      },
      salary_expectation: {
        type: 'number',
        description: "The person's salary expectations",
      },
      skills: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: "The person's skills",
      },
      location: {
        type: 'string',
        description: "The person's location",
      },
      education: {
        type: 'object',
        properties: {
          institution: {
            type: 'string',
            description: "The person's institution",
          },
          field_of_study: {
            type: 'string',
            description: "The person's field of study",
          },
          level: {
            type: 'string',
            description: "The person's level of education",
          },
          duration: {
            type: 'string',
            description: "The person's duration of education",
          },
          start_date: {
            type: 'string',
            description: "The person's start date of education",
          },
          end_date: {
            type: 'string',
            description: "The person's end date of education",
          },
        },
        description: "The person's education",
      },
      experience: {
        type: 'object',
        properties: {
          company: {
            type: 'string',
            description: "The person's company",
          },
          position: {
            type: 'string',
            description: "The person's position",
          },
          duration: {
            type: 'string',
            description: "The person's duration of experience",
          },
          start_date: {
            type: 'string',
            description: "The person's start date of experience",
          },
          end_date: {
            type: 'string',
            description: "The person's end date of experience",
          },
          description: {
            type: 'string',
            description: "The person's description of experience",
          },
        },
        description: "The person's experience",
      },
      languages: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: "The person's languages",
      },
    };

    const systemPrompt = `You are an expert extraction data from portfolio algorithm. Only extract relevant information from the text. If you do not know the value of an attribute asked to extract,return null for the attribute's value.\n Schema: ${JSON.stringify(schema)}`;

    // ================ Prepare LLM model ================

    console.log(
      `LLM model is ready. Scraping ${listOfTargets.length} pages...`,
    );
    // ================ Prepare LLM model ================

    let results = [];

    for (const targetUrl of listOfTargets) {
      try {
        console.log(`-----------------${targetUrl}------------------`);

        console.time('Scrap Detail -> ');
        const text = await WorkUAScenario.scrapDetailPage(
          targetUrl,
          this.browser,
        );
        console.timeEnd('Scrap Detail -> ');

        console.time('Ollama Time -> ');
        const response = await ollama.generate({
          prompt: text,
          system: systemPrompt,
          // model: 'llama3',
          model: 'mistrallite',
          format: 'json',
          stream: false,
          options: {
            temperature: 0,
          },
        });

        results.push(response.response);

        console.log('Status: OK');
      } catch (error) {
        console.log('Status: ERROR ');
        continue;
      } finally {
        console.timeEnd('Ollama Time -> ');
        console.log(
          `Progress: ${listOfTargets.indexOf(targetUrl) + 1}/${listOfTargets.length}`,
        );
      }
    }

    return results;
  }
}

export default WorkUAScenario;
