import { Container, container } from '@packages/di-engine';
import CreateTicketContainer from './CreateTicketContainer';

@container
class TicketsContainer extends Container {
  createTicketContainer(type: string) {
    return new CreateTicketContainer(type, this);
  }
}

export default TicketsContainer;
