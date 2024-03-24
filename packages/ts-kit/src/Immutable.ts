export type Immutable<Type> = {
  +readonly [Key in keyof Type]: Type[Key];
};
