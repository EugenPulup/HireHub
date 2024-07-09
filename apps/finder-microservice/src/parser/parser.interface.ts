export interface Parser {
  parse(text: string): Promise<object>;
}
