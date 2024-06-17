import { useState } from 'react';

const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);

  function toggle() {
    setState(!state);
  };

  return [state, toggle];
};

export default useToggle;