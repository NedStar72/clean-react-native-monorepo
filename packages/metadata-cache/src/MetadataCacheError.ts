export default class MetadataCacheError extends Error {
  constructor(message: string, options: ErrorOptions | undefined = undefined) {
    super(message, options);
  }
}
