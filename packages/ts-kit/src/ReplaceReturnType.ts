export type ReplaceReturnType<T extends (...args: unknown[]) => unknown, TNewReturn> = (
  ...a: Parameters<T>
) => TNewReturn;
