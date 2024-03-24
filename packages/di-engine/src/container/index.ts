import { Container as InversifyContainer } from 'inversify';
import type { Optional } from '@packages/ts-kit';
import DIEngineError from '../DIEngineError';

export type Identifier = string | symbol;

export type DynamicValue<T> = () => T;

export interface BindingInSyntax {
  inSingletonScope(): void;
}

export interface BindingToSyntax<T> {
  toDynamicValue(dynamicValue: DynamicValue<T>): BindingInSyntax;
}

// FIXME: abstract
export class Container {
  private _container: InversifyContainer;

  constructor(parent: Optional<Container> = undefined) {
    this._container = new InversifyContainer();
    this._container.parent = parent?._container ?? null;
  }

  public bind<T>(identifier: Identifier): BindingToSyntax<T> {
    return this._container.bind<T>(identifier);
  }

  public isBound(identifier: Identifier) {
    return this._container.isBound(identifier);
  }

  public get<T>(identifier: Identifier) {
    try {
      return this._container.get<T>(identifier);
    } catch (error) {
      throw new DIEngineError('Внутренняя ошибка inversify', { cause: error });
    }
  }
}
