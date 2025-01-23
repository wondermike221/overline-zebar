import { useEffect, useState, useRef } from "react";

// When state changes, wait for a short period of time before updating the state
// This is useful for waiting for interactions from a user
export function useWaitForStateChange<T>({
  initialState,
  initialDelay = 0, // Instant for the first change
  subsequentDelay = 5000, // Delay for subsequent state changes
}: {
  initialState: T;
  initialDelay?: number;
  subsequentDelay?: number;
}) {
  const [state, setState] = useState<T>(initialState);
  const [newState, setNewState] = useState<T>(initialState);
  const isFirstRun = useRef(true); // Track if it's the first run

  // Handle the initial delay separately
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setNewState(state);
      isFirstRun.current = false; // After the first run, set it to false
    }, initialDelay);

    return () => {
      clearTimeout(timeoutId); // Clean up timeout on each update
    };
  }, [initialDelay, state]); // Run only once for initial delay

  // Handle subsequent delays
  useEffect(() => {
    if (!isFirstRun.current) {
      const timeoutId = setTimeout(() => {
        setNewState(state);
      }, subsequentDelay);

      return () => {
        clearTimeout(timeoutId); // Clean up timeout on each update
      };
    }
  }, [state, subsequentDelay]); // Apply subsequent delay only after the first run

  return {
    state: newState,
    setState,
  };
}
