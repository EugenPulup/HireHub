import type { Browser } from 'puppeteer';
import { Scrapper } from './scrapper.interface';
import puppeteer from 'puppeteer';
import { Logger } from '@nestjs/common';

const logger = new Logger('WorkuaScrapper');

class WorkuaScrapper implements Scrapper {
  private browser: Browser;

  constructor(browser: Browser) {
    this.browser = browser;
  }

  async *scrapByKeyword(
    keyword: string,
  ): AsyncGenerator<string, void, unknown> {
    const listOfTargets = await this.scrapPagesList(keyword);

    for (const targetUrl of listOfTargets) {
      try {
        const ReaderResponse = await (
          await fetch(`https://r.jina.ai/${targetUrl}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
            },
          })
        ).json();

        yield ReaderResponse?.content || ReaderResponse.data.content;
      } catch (error) {
        logger.log('Status: ERROR ');
        continue;
      } finally {
        logger.log(
          `Progress: ${listOfTargets.indexOf(targetUrl) + 1}/${listOfTargets.length}`,
        );
      }
    }
  }

  scrapByUrl() {
    return 'test';
  }

  private async scrapPagesList(keyword: string): Promise<string[]> {
    let lastPage = false;
    let pageNumber = 1;
    let list: string[] = [];

    const page = await this.browser.newPage();

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
}

export { WorkuaScrapper };
