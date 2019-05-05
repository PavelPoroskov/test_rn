//custom hook useAppIsActive inside other custom hook useRepeatRequestWhenActive

import { useReducer, useEffect, useRef, useCallback } from "react";
import useAppIsActive from './useAppIsActive'

function fetchLimit(URL, msLimit) {
  let timeoutId;
  const timer = new Promise(resolve => {
    timeoutId = setTimeout(resolve, msLimit, { timeout: true });
  });

  return Promise.race([fetch(URL), timer]).then(response => {
    if (response.timeout) {
      throw new Error("Connection timed out");
    }

    clearTimeout(timeoutId);
    return response;
  });
}

const initState = { session: true, loading: true, data: null, error: null };

function reducer(state, action) {
  //console.log(`action.type ${action.type}`)

  switch (action.type) {
    case "session-begin":
      return initState; // { session: true, loading: true, data: null, error: null }
    case "session-pause":
      return { ...state, session: false, loading: false, data: null };

    case "request-success":
      if (state.session) {
        return { ...state, loading: false, data: action.payload, error: null };
      }
      return state;
    case "request-error":
      if (state.session) {
        return { ...state, loading: false, error: action.payload };
      }
      return state;
    default:
      throw new Error();
  }
}

function useRepeatRequestWhenActive(isOn, URL, delay, fnTransform) {
  const appIsActive = useAppIsActive()
  const [state, dispatch] = useReducer(reducer, initState); // spinner on only first screen open
  //const savedCountRequest = useRef(0)
  const savedCountSessionRequest = useRef(0);

  const fnRequest = useCallback(async () => {
    //savedCountRequest.current = savedCountRequest.current + 1
    savedCountSessionRequest.current = savedCountSessionRequest.current + 1;

    try {
      const result = await fetchLimit(URL, 1500);
      let newData = await result.json();
      if (fnTransform) {
        newData = fnTransform(newData);
      }
      dispatch({ type: "request-success", payload: newData });
    } catch (err) {
      console.log(err);
      dispatch({ type: "request-error", payload: err });
    }
  }, [URL, fnTransform]);

  useEffect(() => {
    if (isOn && appIsActive && delay) {
      dispatch({ type: "session-begin" });
      savedCountSessionRequest.current = 0;

      fnRequest();
      let idInterval = setInterval(fnRequest, delay);
      return () => clearInterval(idInterval);
    } else {
      dispatch({ type: "session-pause" });
    }
  }, [isOn, appIsActive, delay, fnRequest]);

  let info = {
    countRequest: savedCountSessionRequest.current
  };

  const { loading, data, error } = state;
  return [
    loading,
    data,
    error,

    info
    //null,
  ];
}

export default useRepeatRequestWhenActive;
