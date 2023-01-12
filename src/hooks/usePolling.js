import { useState, useEffect, useRef } from 'react';

const usePolling = config => {
  const { interval = 3000, onTick } = config;
  const [isPolling, togglePolling] = useState(false);

  const persistedIsPolling = useRef();
  const isMounted = useRef();
  const poll = useRef();

  persistedIsPolling.current = isPolling;

  useEffect(() => {
    isMounted.current = true;
    startPolling();
    return () => {
      isMounted.current = false;
      stopPolling();
    };
  }, []);

  const stopPolling = () => {
    if (poll.current) {
      clearTimeout(poll.current);
      poll.current = null;
    }
    togglePolling(false);
  };

  const startPolling = () => {
    // why this does not update state?
    togglePolling(true);
    // call runPolling, which will start timer and call our api
    runPolling();
  };

  const runPolling = () => {
    const timeoutId = setTimeout(() => {
      onTick();
      persistedIsPolling.current ? runPolling() : stopPolling();
    }, interval);
    poll.current = timeoutId;
  };

  return [isPolling, startPolling, stopPolling];
};

export default usePolling;
