export class ApplicationException extends Error {
  public status = 400;
  public name = 'NotFoundException';

  constructor(message: string, statusCode: number) {
    super(message);
    this.status = statusCode;

    Object.defineProperties(this, {
      message: { value: message, enumerable: true },
    });
  }
}
