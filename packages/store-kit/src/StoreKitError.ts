export default class StoreKitError extends Error {
  constructor(message: string, options: ErrorOptions | undefined = undefined) {
    super(message, options);
  }
}
