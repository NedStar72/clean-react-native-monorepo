export default class NavigationError extends Error {
  constructor(message: string, options: ErrorOptions | undefined = undefined) {
    super(message, options);
  }
}
