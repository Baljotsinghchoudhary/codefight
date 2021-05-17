const SNAKE_CASE_MATCH = /_\w/g;
const CAMEL_CASE_MATCH = /([A-Z])/g;

export class Utils {
  public static sleep(timeInMilliseconds: number): Promise<unknown> {
    return new Promise<unknown>(resolve =>
      setTimeout(resolve, timeInMilliseconds)
    );
  }

  public static excerptHTML(htmlString: string) {
    if (!htmlString) return '';
    return htmlString.replace(/<[^>]+>/g, '');
  }

  public static limitWords(textString: string, numberOfWords: number) {
    return textString.split(' ').splice(0, numberOfWords).join(' ');
  }

  /**
   * Mimics the hash implementation done on Android and iOS for determining fall
   * back images, etc.
   * Two inputs with same contents but different order will return the same value.
   * If you care about collisions, use `hash` below :)
   *
   * @param  {string} input String to be hashed per android and ios implementation
   * @return {string} hash of string input
   */
  public static simpleStringHash(input: string): string {
    const hash = 0;

    if (!input) {
      return hash.toString();
    }

    return (
      input
        .split('')
        // eslint-disable-next-line unicorn/no-array-reduce
        .reduce((memo, char) => memo + char.charCodeAt(0), hash)
        .toString()
    );
  }

  /**
   * Converts a camelCase string to an underscore_string
   */
  public static camelToSnake(key: string): string {
    return key.replace(CAMEL_CASE_MATCH, chars => `_${chars.toLowerCase()}`);
  }

  /**
   * Converts an underscore_string to a camelCase string
   */
  public static snakeToCamel(key: string): string {
    return key.replace(SNAKE_CASE_MATCH, chars => chars[1].toUpperCase());
  }

  // public static toCamel(s: string) {
  //     return s.replace(/([-_][a-z])/ig, ($1) => {
  //         return $1.toUpperCase()
  //             .replace('-', '')
  //             .replace('_', '');
  //     });
  // }

  /**
   * Converts to deep copy with camelCase
   */
  public static keysToCamel(o: any): any {
    if (o === Object(o) && !Array.isArray(o) && typeof o !== 'function') {
      const n = {};
      for (const k of Object.keys(o)) {
        //@ts-ignore
        n[this.snakeToCamel(k)] = this.keysToCamel(o[k]);
      }
      return n;
    } else if (Array.isArray(o)) {
      return o.map(index => {
        return this.keysToCamel(index);
      });
    }
    return o;
  }

  /**
   * Converts to deep copy with snakeCase
   */
  public static keysToSnake(o: any): any {
    if (o === Object(o) && !Array.isArray(o) && typeof o !== 'function') {
      const n = {};
      for (const k of Object.keys(o)) {
        //@ts-ignore
        n[this.camelToSnake(k)] = this.keysToSnake(o[k]);
      }
      return n;
    } else if (Array.isArray(o)) {
      return o.map(index => {
        return this.keysToSnake(index);
      });
    }
    return o;
  }
}
