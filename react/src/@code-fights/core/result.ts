export default class Result<T> {
  isError: boolean;
  private readonly error: any;
  private readonly value: T;
  private constructor(isError: boolean, error?: any, value?: T) {
    this.isError = isError;
    this.error = error ?? {};
    this.value = value ?? ({} as T);
  }

  public getError() {
    return this.error;
  }

  public getValue(): T {
    return this.value;
  }

  public static success<T>(value: T): Result<T> {
    return new Result<T>(false, undefined, value);
  }

  public static failed<T>(error: any): Result<T> {
    return new Result<T>(true, error, undefined);
  }
}
