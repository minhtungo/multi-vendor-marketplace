import { createContext, useContext, useState } from 'react';
import { type StoreApi, useStore } from 'zustand';

export type ExtractState<S> = S extends {
  getState: () => infer T;
}
  ? T
  : never;

export const createZustandContext = <TInitial, TStore extends StoreApi<any>>(
  getStore: (initial?: TInitial) => TStore,
) => {
  const Context = createContext(null as any as TStore);

  const Provider = (props: { children?: React.ReactNode; initialValue?: TInitial }) => {
    const [store] = useState(getStore(props.initialValue));

    return <Context value={store}>{props.children}</Context>;
  };

  return {
    useStore: <T,>(selector: (state: ExtractState<TStore>) => T) => {
      const store = useContext(Context);
      return useStore(store, selector);
    },
    Provider,
  };
};
