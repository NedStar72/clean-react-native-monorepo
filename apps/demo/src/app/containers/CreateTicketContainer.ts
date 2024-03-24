import { Container, container } from '@packages/di-engine';

@container
class CreateTicketContainer extends Container {
  type: string;

  constructor(type: string, ...args: ConstructorParameters<typeof Container>) {
    super(...args);
    this.type = type; // на самом деле лучше оставить такие вещи навигации
  }
}

export default CreateTicketContainer;
