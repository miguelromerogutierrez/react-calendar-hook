import React from 'react';

export default function useControlledProp(initialState, isControlled) {
  const [state, setState] = React.useState(initialState);

  const onUpdateProp = React.useCallback(
    changes => {
      if (isControlled) setState(changes);
    },
    [isControlled]
  );

  const setSafeState = React.useCallback(
    changes => {
      if (!isControlled) setState(changes);
    },
    [isControlled]
  );

  React.useEffect(() => {
    onUpdateProp(initialState);
  }, [initialState]);

  return [state, setSafeState];
}
