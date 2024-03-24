import React, { useEffect } from 'react';
import { Linking } from 'react-native';
import {
  CommonActions,
  StackActions,
  TabActions,
  createNavigationContainerRef,
} from '@react-navigation/native'; // TODO: спрятать
import { NavigationContainer } from '@packages/navigation';
import { useLazyRef } from '@packages/react-utils';
import { TaBarCoordinator } from './coordinators';
import { RootContainer } from './containers';
import { CreateTicketStep, FilterStep, TabBarStep, TicketsStep } from './steps';

const navigationRef = createNavigationContainerRef();

const App = () => {
  useEffect(() => {
    const subscription = Linking.addEventListener('url', ({ url }) => {
      const ticketsTabInitialized = !!navigationRef.getRootState().routes[1].state;

      switch (url) {
        case 'demo://filterAddress':
          navigationRef.dispatch(StackActions.push(FilterStep.filterAddress));
          break;
        case 'demo://objectList':
          navigationRef.dispatch(StackActions.push(FilterStep.objectList));
          break;

        case 'demo://createTicketSecondStage': {
          if (ticketsTabInitialized) {
            navigationRef.dispatch(TabActions.jumpTo(TabBarStep.tickets));
            navigationRef.dispatch(
              CommonActions.navigate(TicketsStep.createTicket, {
                initial: false,
                screen: CreateTicketStep.createTicketSecondStage,
                type: 'deepType',
              }),
            );
          } else {
            navigationRef.dispatch(
              CommonActions.navigate(TabBarStep.tickets, {
                initial: false,
                screen: TicketsStep.createTicket,
                type: 'deepType',
                params: {
                  initial: false,
                  screen: CreateTicketStep.createTicketSecondStage,
                  type: 'deepType',
                },
              }),
            );
          }
          break;
        }
        default:
          break;
      }
    });

    return () => subscription.remove();
  }, []);

  const rootContainer = useLazyRef(() => new RootContainer()).current;

  return (
    <NavigationContainer ref={navigationRef}>
      <TaBarCoordinator rootContainer={rootContainer} />
    </NavigationContainer>
  );
};

export default App;

// // const ModalState: PartialState<NavigationState> = {
// //   routes: [
// //     {
// //       name: NestedStep.s1,
// //     },
// //     {
// //       name: NestedStep.s2,
// //       path: 'tab2/modalCoordinator/s2', // очень важно
// //     },
// //   ],
// // };

// // const SecondTabState: PartialState<NavigationState> = {
// //   // index: 1,
// //   routes: [
// //     {
// //       name: SecondTabStep.screen1, // initialRoute
// //       // path: 'tab2/screen1', // очень важно
// //     },
// //     // {
// //     //   name: SecondTabStep.screen2,
// //     //   // path: 'tab2/screen2', // очень важно
// //     // },
// //     // {
// //     //   name: SecondTabStep.screen1, // initialRoute
// //     //   path: 'tab2/screen1', // очень важно
// //     // },
// //     {
// //       name: SecondTabStep.modalCoordinator,
// //       state: ModalState,
// //       // path: 'tab2/nestedCoordinator',
// //     },
// //     // { name: NestedStep.s2 },
// //   ],
// // };

// const TabBarState = {
//   routes: [
//     {
//       name: TabBarStep.tab2,
//       // params: ...
//       // state: SecondTabState, // Имеет собственный state = навигатор
//     },
//   ],
//   // type: string;
// };

// const linking: LinkingOptions = {
//   prefixes: ['demo://'],
//   // config: {
//   //   screens: {
//   //     [TabBarStep.tab2]: {
//   //       initialRouteName: SecondTabStep.screen1,
//   //       screens: {
//   //         [SecondTabStep.modalCoordinator]: {
//   //           initialRouteName: NestedStep.s1, // Работает только фактический первый шаг
//   //           screens: {
//   //             [NestedStep.s1]: '2/3/1',
//   //             [NestedStep.s2]: '2/3/2',
//   //             [NestedStep.s3]: '2/3/3/:id',
//   //           },
//   //         },
//   //       },
//   //     },
//   //   },
//   // },
//   getStateFromPath: (path, options) => {
//     // console.log(path, options);
//     // const state = getStateFromPath(path, options);
//     // console.log(JSON.stringify(state));
//     // return state;
//     return TabBarState;
//   },
//   getActionFromState: (state, options) => {
//     // console.log(JSON.stringify(state, options));
//     // const action = getActionFromState(state, options);
//     // console.log(JSON.stringify(action));
//     // return action;

//     // кейс 6 (нужен заранее открытый таб)
//     return {
//       type: 'PUSH',
//       payload: {
//         name: SecondTabStep.nestedCoordinator,
//         params: {
//           initialStep: NestedStep.modalCoordinator,
//           initialParams: {
//             initialStep: NestedStep.s2,
//           },
//           // initial: true,
//           // screen: NestedStep.s3,
//           // params: { id: '123' },
//           // path: '2/3/3/123',
//         },
//       },
//     };
//     // кейс 5
//     // return {
//     //   type: 'NAVIGATE',
//     //   payload: {
//     //     name: TabBarStep.tab2,
//     //     params: {
//     //       initial: false,
//     //       screen: SecondTabStep.nestedCoordinator,
//     //       params: {
//     //         initialStep: NestedStep.modalCoordinator,
//     //         initialParams: {
//     //           initialStep: NestedStep.s2,
//     //         },
//     //         // initial: true,
//     //         // screen: NestedStep.s3,
//     //         // params: { id: '123' },
//     //         // path: '2/3/3/123',
//     //       },
//     //     },
//     //   },
//     // };
//     // кейс 4
//     // return {
//     //   type: 'NAVIGATE',
//     //   payload: {
//     //     name: 'tab2',
//     //     params: {
//     //       initial: false,
//     //       screen: '2_modalCoordinator',
//     //       params: { initial: false, screen: 's3', params: { id: '123' }, path: '2/3/3/123' },
//     //     },
//     //   },
//     // };
//     // кейс 3
//     // return {
//     //   type: 'NAVIGATE',
//     //   payload: {
//     //     name: TabBarStep.tab2,
//     //     params: {
//     //       initial: false,
//     //       screen: '2_modalCoordinator',
//     //       params: {
//     //         initial: false,
//     //         screen: 's2',
//     //         path: 'tab2/modalCoordinator/s2',
//     //       },
//     //     },
//     //   },
//     // };
//     // кейс 2
//     // return {
//     //   type: 'NAVIGATE',
//     //   payload: {
//     //     name: TabBarStep.tab2,
//     //     params: {
//     //       state: SecondTabState,
//     //     },
//     //   },
//     // };
//     // кейс 1
//     // return {
//     //   type: 'NAVIGATE',
//     //   payload: {
//     //     name: TabBarStep.tab2,
//     //     params: {
//     //       initial: false,
//     //       screen: SecondTabStep.screen2,
//     //       path: 'tab2/screen2',
//     //     },
//     //   },
//     // };
//   },
// };
