import { useState } from 'react';

export const useToggleState = (initialState: boolean = false) => {
  const [state, setState] = useState(initialState);

  return {
    open: () => setState(true),
    close: () => setState(false),
    toggle: () => setState((prev) => !prev),
    state,
  };
};
