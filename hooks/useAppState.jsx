import { useEffect, useState, useRef } from "react";
import { AppState } from "react-native";

// active | background | inactive

const useAppState = function () {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  return { appStateVisible };
};

export default useAppState;
