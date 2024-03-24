/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-classes-per-file */
import { observable } from 'mobx';
import type { NonFunctionKeys, NonReadonlyKeys, Immutable } from '@packages/ts-kit';

type BaseEntity = object;

type ModelType<T extends BaseEntity> = Immutable<Pick<T, NonFunctionKeys<T> & NonReadonlyKeys<T>>>;

abstract class Model<Entity extends BaseEntity> {
  constructor(entity: Entity) {
    // eslint-disable-next-line no-console
    console.log(entity);
  }
}

export function model<Entity extends BaseEntity, EntityModel extends Model<Entity>>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor: new (...args: any[]) => EntityModel,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return constructor as unknown as new (...args: any[]) => ModelType<Entity>;
}

interface SomeEntity {
  id: string;
  data: string;
}

// type SomeEntity = ModelType<{
//   id: string;
//   data: string;
// }>;

// @ts-ignore
@model
class SomeEntityModel extends Model<SomeEntity> {
  @observable id!: string;
  @observable data!: string;
}

const someEntityInstance = new SomeEntityModel({ id: '1', data: 'someData' });
