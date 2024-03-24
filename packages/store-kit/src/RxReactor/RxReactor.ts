import { Disposable } from '../Disposable';
import { BaseActions, BaseMutations } from './BaseTypes';
import { RxReactorDelegate } from './RxReactorDelegate';

class RxReactor<Actions extends BaseActions, Mutations extends BaseMutations> extends Disposable {
  private readonly delegate: RxReactorDelegate<Actions, Mutations>;

  constructor(delegate: RxReactorDelegate<Actions, Mutations>) {
    super();
    this.delegate = delegate;
  }

  public dispatch<Action extends keyof Actions, Payload = Actions[Action]>(
    action: Action,
    payload: Payload,
  ): void {
    throw new Error(
      `${JSON.stringify(action)}, ${JSON.stringify(payload)}, ${JSON.stringify(this.delegate)}`,
    );
  }
}

export default RxReactor;
