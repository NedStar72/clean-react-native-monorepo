import { Container, container, resolve } from '@packages/di-engine';

@container
class ObjectsContainer extends Container {
  @resolve('filter')
  filter!: string;
}

export default ObjectsContainer;
