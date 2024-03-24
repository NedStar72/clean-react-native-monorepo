import { Container, container } from '@packages/di-engine';
import FilterContainer from './FilterContainer';
import TicketsContainer from './TicketsContainer';
import ShowsContainer from './ShowsContainer';
import CalendarContainer from './CalendarContainer';
import MenuContainer from './MenuContainer';

@container
class RootContainer extends Container {
  get filterContainer() {
    return new FilterContainer(this);
  }

  get ticketsContainer() {
    return new TicketsContainer(this);
  }

  get showsContainer() {
    return new ShowsContainer(this);
  }

  get calendarContainer() {
    return new CalendarContainer(this);
  }

  get menuContainer() {
    return new MenuContainer(this);
  }
}

export default RootContainer;
