import { BaseSteps } from '../BaseSteps';
import { BaseOptions } from '../Step';
import { Config, ConfigIdentifier } from '../ConfigContext';

interface Action<Type extends string, Payload extends Record<string, unknown>> {
  type: Type;
  payload: Payload;
}

type BaseAction = Action<string, Record<string, unknown>>;

interface ActionCreator<Action extends BaseAction> {
  (payload: Action['payload']): Action;
}

type SetAction<Steps extends BaseSteps, Options extends BaseOptions> = Action<
  'set',
  {
    id: ConfigIdentifier;
    config: Config<Steps, Options>;
  }
>;

type RemoveAction = Action<
  'remove',
  {
    id: ConfigIdentifier;
  }
>;

// FIXME: IDK how to use ActionCreator (without wrapper-creator)
export const set = <Steps extends BaseSteps, Options extends BaseOptions>(
  payload: SetAction<Steps, Options>['payload'],
) => {
  return {
    type: 'set' as const,
    payload,
  };
};

export const remove: ActionCreator<RemoveAction> = payload => {
  return {
    type: 'remove',
    payload,
  };
};

export type ConfigReducerAction<Steps extends BaseSteps, Options extends BaseOptions> =
  | SetAction<Steps, Options>
  | RemoveAction;
