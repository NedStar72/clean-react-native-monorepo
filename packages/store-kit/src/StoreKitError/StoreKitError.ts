import { StoreKitErrorName, generateErrorMessage } from './errors';

export default class StoreKitError extends Error {
  constructor(errorName: StoreKitErrorName, options: ErrorOptions | undefined = undefined) {
    super(generateErrorMessage(errorName), options);
  }
}
