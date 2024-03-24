import { Observable } from 'rxjs';
import type { Entry } from '@packages/ts-kit';
import { BaseActions, BaseMutations } from './BaseTypes';

export interface RxReactorDelegate<Actions extends BaseActions, Mutations extends BaseMutations> {
  transformAction?(action: Observable<Entry<Actions>>): Observable<Entry<Actions>>;
  mutate(action: Entry<Actions>): Observable<Entry<Mutations>>;
  transformMutation?(mutation: Observable<Entry<Mutations>>): Observable<Entry<Mutations>>;
  react(mutation: Entry<Mutations>): void;
}
