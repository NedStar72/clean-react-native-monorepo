# clean-react-native-monorepo

TODO

#### Что еще можно сделать:
1. Добавить `Storуbook` в `@packages/ui-kit`
2. Завести документацию. Использовать `Docusaurus`?
3. Перейти на [typescript 5 декораторы](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#decorators)
4. Добавить [spell check](https://www.npmjs.com/package/cspell) и [`commitlint`](https://commitlint.js.org/)
5. Перейти c `yarn` на [`bun`](https://github.com/oven-sh/bun)
6. Перейти c `eslint` на [`oxc`](https://github.com/oxc-project/oxc)
7. Сделать CI на основе [`nx affected`](https://nx.dev/ci/recipes/set-up/monorepo-ci-gitlab)

## @packages/ts-kit

Данный пакет содержит в себе полезные инструменты типизации

#### Что еще можно сделать:
1. Перейти на использование `tsconfig.types`

## @packages/metadata

Данный пакет стандартизируют работу с `reflect-metadata`

```javascript
const SOME_TYPE = Symbol('some');

class SomeMetadata extends Metadata {
  public readonly someValue: SomeValue;

  constructor(someValue: SomeValue) {
    super(SOME_TYPE);

    this.someValue = someValue;
  }
}

function isSomeMetadata(metadata: Metadata): metadata is SomeMetadata {
  return metadata.type === SOME_TYPE;
}

export function hasSomeMetadata(target: Object, propertyKey: string | symbol) {
  return hasMetadata(target, propertyKey, SOME_TYPE);
}

export function createSomeMetadata<Value>(target: Object, propertyKey: string | symbol, someValue: SomeValue) {
  defineMetadata(target, new SomeMetadata(someValue), propertyKey);
}

export function getSomeMetadata(target: Object, propertyKey: string | symbol): SomeValue {
  const metadata = getMetadata(target, propertyKey, SOME_TYPE);
  if (isSomeMetadata(metadata)) {
    return metadata;
  }
  throw new Error('Not found');
}
```

#### Что еще можно сделать:
1. Сделать фабрику метаданных

## @packages/metadata-cache

Данный пакет реализует кэш посредством метаданных. В первую очередь пакет ориентирован на использование с полями/свойствами классов

```javascript
function getCachedValue(target, prop) {
  if (hasCache(target, prop)) {
    return getCache(target, prop);
  }
  const value = doHeavyCalculations(target, prop);
  createCache(target, prop, value);
  return value;
}
```

#### Что еще можно сделать:
1. Уйти от ориентации на использование с полями/свойствами классов. Добавить возможность использовать с функциями

## @packages/di-engine

TODO

```javascript
@container
class SomeSubContainer extends Container {
  @resolve(somePropIdentifier)
  someProp!: SomeProp;
}

@container
class SomeContainer extends Container {
  @resolve(someDepIdentifier)
  someDep!: SomeDep;

  @provide(somePropIdentifier)
  get someProp() {
    return new SomeProp();
  }

  get someSubContainer() {
    return new SomeSubContainer(this);
  }
}

const someContainer = new SomeContainer();
const someSubContainer = someContainer.someSubContainer;
const resolvedSomeProps = someSubContainer.someProp;
expect(resolvedSomeProps).not().toBeUndefined();
```

#### Что еще можно сделать:
1. Поменять регистрацию метаданных. Регистрировать метаданные в property, а в контейнере описывать какие поля были затронуты
2. Обработать двойные `provide` и `resolve`
3. Вынести кэш из `provide`, он там лишний (создать `@cacheable` и `@cache`, "обернуть" `@container` в `@cacheable`)
4. Попытаться убрать `@ts-ignore` и отключенный линт
5. Сделать `DIEngineError` глобальным в рамках пакета
6. Сделать фабрику декораторов

## @packages/navigation

TODO

#### Что еще надо сделать:
1. Сделать собственный обработчик диплинков. Можно смело вдохновляться [`useLinking`](https://github.com/react-navigation/react-navigation/blob/8367758824590b9affd07ce651f8020aca2a88f6/packages/native/src/useLinking.native.tsx#L20). Основа собственного обработчика:
  ```javascript
  const navigationRef = createNavigationContainerRef();
  // ...
  useEffect(() => {
    const subscription = Linking.addEventListener('url', ({ url }) => {
      const secondTabInitialized = !!navigationRef.getRootState().routes[1].state;
      if (secondTabInitialized && url === 'demo://tab2/screen2') {
        navigationRef.dispatch(TabActions.jumpTo(TabBarStep.tab2));
        navigationRef.dispatch(StackActions.push(SecondTabStep.screen2));
      } else if (!secondTabInitialized && url === 'demo://tab2/screen2') {
        navigationRef.dispatch(
          CommonActions.navigate(TabBarStep.tab2, {
            initial: false,
            screen: SecondTabStep.screen2,
            // params
          }),
        );
      }
    });
    return () => subscription.remove();
  }, []);
  ```
1. Избавиться от `withConfig`, возвращать конфиг из `useCoordinatorBuilder`, а в `NavigatorContainer` добавить `ConfigContext.Provider`
2. Перейти на `useSyncReducer`. Реализация `useSyncReducer` аналогична [`useSyncState`](https://github.com/react-navigation/react-navigation/pull/11685)
3. Поправить вычисление конфига в `useConfigBuilder`, сейчас компоненты буду повторно оборачиваться в `withForwardedNavigationParams` и в `withStepper` при обновлении опций или добавлении новых экранов. Надо отделить формирование конфига от формирования компонентов
4. Добиться корректной обработки открытия двух экранов в **следующем** координаторе. Пример перехода:
  ```javascript
  // Необязательно иметь именно такой интерфейс для двойного шага
  stepper.step(Step.someStep, { initialStep: NestedStep.someNestedStep });
  stepper.step(NestedStep.someNestedStep2, { someParams });
  ````
1. Добавить утилиты для таббара. `useTabBarHeight` и т.п.
2. Сделать `NavBar`

#### Что еще можно сделать:
1. В координаторах перейти от `options` к пропсам
2. Убрать опционал у `CoordinatorProps.initialParams`. Убрать опционал мешает типизация шагов и координаторов. Ни шаги, ни координаторы не являются дженериками, а значит не могут связать `initialStep` с `initialParams`
3. Объединить `NavigatorContext` и `StepperContext`, чтобы:
   1. у `nested` координаторов был собственный `NavigationHandler`
   2. в каждом отдельном координаторе можно было определить кастомный `NavigationHandler`.

    Тут же можно подумать над возвращением нескольких шагов из `NavigationHandler` и над шагами-пустышками, которые ведут например на шаг назад или закрывают координатор (`popToPop` + `goBack`)
4. Добавить `Extract` в шаги, чтобы убрать `as string`


## @packages/serialization

TODO

```javascript
@serializable
class SomeData {
  @number id!: number;

  @string
  @optional
  description?: string;

  @boolean
  flag!: boolean;

  @date
  @nullable
  someDate!: Date | null;

  @alias('other_data')
  @object(OtherData)
  otherData!: OtherData;

  @list(object(OtherData))
  @alias('other_data_list')
  otherData!: OtherData[];

  @list(or(object(OtherData), number))
  @alias('other_data_list')
  otherData!: (OtherData | number)[];

  @record(OtherData)
  fields!: Record<string, OtherData>;

  @custom(serializeFunction, deserializeFunction)
  somethingVeryWeird!: Object;

  @raw
  anything: Any;
}
```

## @packages/rx-network

TODO

#### Что еще надо сделать:
1. Перенести код из `axios-observable`

## @packages/dynamic-config

TODO


#### Обдумать:
- Возможно лучше сделать конфиг рекурсивным, а не двухуровневым?

```javascript
type BaseConfigSlice = Record<string, JSONValue>;

type ConfigIdentifier = string;

// Под капотом обычный редусер
interface DynamicConfigSlice<ConfigSlice extends BaseConfigSlice> {
  // private defaultValues: ConfigSlice;
  // private values: ConfigSlice;
  readonly name: ConfigIdentifier;
  set: (values: ConfigSlice) => void; // заменяет values и defaultValues
  update: <Key extends keyof ConfigSlice>(
    key: Key,
    value: ConfigSlice[Key],
  ) => ConfigSlice[Key];
  updateAll: (values: Partial<ConfigSlice>) => ConfigSlice;
  get: <Key extends keyof ConfigSlice>( // не проще сделать readonly values и организовать работу через getter-setter?
    key: Key,
    defaultValue?: boolean,
  ) => ConfigSlice[Key];
  getAll: (defaultValue?: boolean) => ConfigSlice;
  reset: <Key extends keyof ConfigSlice>(key: Key) => void;
  resetAll: () => void;
  // addListeners: (listeners: {
  //   onAction: (action: string) => void;
  //   onSet: () => void;
  //   onUpdate: () => void;
  //   // ...
  // }) => () => void;
}

interface DynamicConfigHookType<ConfigSlice extends BaseConfigSlice> {
  values: ConfigSlice; // Реактивные значения конфига, надо сделать обертку еще и для mobx
  update: DynamicConfigSlice<ConfigSlice>['update'];
}

function useConfig<ConfigSlice extends BaseConfigSlice>(
  name: ConfigIdentifier,
): DynamicConfigHookType<ConfigSlice> {
  // useSyncExternalStore
  return {} as unknown as DynamicConfigHookType<ConfigSlice>;
}

interface ConfigSliceOptions {
  name?: string;
}

interface DynamicConfig {
  register: <ConfigSlice extends BaseConfigSlice>(
    defaultValues: ConfigSlice,
    options?: ConfigSliceOptions, // заменить на Optional<>
  ) => ConfigIdentifier;
  slice: <ConfigSlice extends BaseConfigSlice>(
    name: ConfigIdentifier,
  ) => DynamicConfigSlice<ConfigSlice>;
  setAll: (slices: Record<ConfigIdentifier, BaseConfigSlice>) => void; // (!) заменяет в том числе и дефолтные значения
  updateAll: (slices: Record<ConfigIdentifier, BaseConfigSlice>) => void;
  getAll: () => Array<DynamicConfigSlice<BaseConfigSlice>>;
  toJSON: () => string;
  // addListeners?
}

// Слайс конфига должен быть JSON-like
type SomeConfigSlice = {
  isSomethingEnabled: boolean;
  someProp: string;
  someDeepProps: {
    value: number;
    arr: Array<number>;
  };
  optionalValue?: string;
  nullableValue: null;
};

const _DynamicConfig = {} as unknown as DynamicConfig;

const configName = _DynamicConfig.register<SomeConfigSlice>({
  isSomethingEnabled: true,
  someProp: 'someValue',
  someDeepProps: {
    value: 132,
    arr: [123, 132],
  },
  nullableValue: null,
});

const ObjectDetail = () => {
  const config = useConfig<SomeConfigSlice>(configName);

  console.log(config.values);

  return null;
};

/// --- Mobx ---

interface ReactiveDynamicConfigSlice<ConfigSlice extends BaseConfigSlice>
  extends DynamicConfigSlice<ConfigSlice> {
  readonly values: ConfigSlice;
}

// get > make, потому что мы должны получать slice по id
// поэтому нет смысла сначала получать, а потом делать makeObservableConfig
// А вот под капотом уже есть смысл в makeObservableConfig
function getObservableConfig<ConfigSlice extends BaseConfigSlice>(
  name: ConfigIdentifier,
): ReactiveDynamicConfigSlice<ConfigSlice> {
  return {} as unknown as ReactiveDynamicConfigSlice<ConfigSlice>;
}
```

## @packages/store-kit

TODO

#### Обдумать:
- Как реагировать на события, снеки и алерты
- Как пробросить навигацию в стор? Придется в контексте стора доставать навигацию?

```javascript
interface SomeEntity {
  id: string;
  data: Data;
}

@model
class SomeEntityModel extends Model<SomeEntity> {
  @identifier id!: string;
  @prop data!: Data;
}

const someEntity1: SomeEntity = createModelInstance(SomeEntityModel, { id: 'id', data: new Data() })
const someEntity2: SomeEntity = createModelInstance(SomeEntityModel, { id: 'id', data: new Data() })
expect(someEntity1).toEqual(someEntity2); // true
expect(someEntity1.data).toEqual(someEntity2.data); // true
```

```javascript
interface Actions {
  someAction: { data: string };
}

interface Mutations {
  someMutation: { data: number };
}

@makeObservable
// @makePersistable
class SomeStore extends Store<Actions, Mutations> {
  @observable data: number;

  someUseCases: SomeUseCases;

  constructor(someUseCases: SomeUseCases) {
    super();

    this.someUseCases = someUseCases;
  }

  mutate([action, payload]: Entry<Actions>): Observable<Entry<Mutations>> {
    switch(action) {
      case 'someAction':
        return this.someUseCases
          .fetchSomeData(payload.data)
          .pipe(map(data => { data }));
    }
  }
  
  @action.bound
  react([mutation, payload]: Entry<Mutations>) {
    switch(mutation) {
      case 'someMutation':
        this.data = payload.data;
        break;
    }
  }

  @action.bound
  fetchSomeData(data: string) {
    this.dispatch('someAction', data);
  }
}
```