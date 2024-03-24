import { Container, container, provide } from '@packages/di-engine';
import ObjectsContainer from './ObjectsContainer';

@container
class FilterContainer extends Container {
  @provide('filter')
  get filter() {
    return 'AwesomeFilter!';
  }

  get objectsContainer() {
    return new ObjectsContainer(this);
  }
}

export default FilterContainer;
