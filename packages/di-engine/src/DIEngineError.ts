export default class DIEngineError extends Error {
  constructor(message: string, options: ErrorOptions | undefined = undefined) {
    super(message, options);
  }
}
