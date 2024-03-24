export default class MetadataError extends Error {
  constructor(message: string, options: ErrorOptions | undefined = undefined) {
    super(message, options);
  }
}
