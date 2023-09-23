import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// TODO: https://stackoverflow.com/questions/62079477/line-0-parsing-error-cannot-read-property-map-of-undefined
const useUpdateState = <S>(initial: S | (() => S)): [S, Dispatch<SetStateAction<S>>] => {
  const [state, setState] = useState<S>(initial);
  useEffect(() => setState(initial), [initial]);
  return [state, setState];
};

export default useUpdateState;
