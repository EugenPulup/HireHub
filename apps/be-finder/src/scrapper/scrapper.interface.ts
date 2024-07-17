import type { Browser } from 'puppeteer';

export interface Scrapper {
  scrapByUrl(url: string): string;

  scrapByKeyword(keyword: string): AsyncGenerator<string, void, unknown>;
}
