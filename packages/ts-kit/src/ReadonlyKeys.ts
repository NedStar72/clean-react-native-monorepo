export type IfEquals<X, Y, A, B> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;

export type ReadonlyKeys<Type> = {
  [Key in keyof Type]-?: IfEquals<
    { [Q in Key]: Type[Key] },
    { -readonly [Q in Key]: Type[Key] },
    never,
    Key
  >;
}[keyof Type];

export type NonReadonlyKeys<Type> = {
  [Key in keyof Type]: IfEquals<
    { [Q in Key]: Type[Key] },
    { -readonly [Q in Key]: Type[Key] },
    Key,
    never
  >;
}[keyof Type];
