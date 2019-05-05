import { useReducer, useEffect, useRef, useCallback, useMemo } from "react";

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
      throw new Error(`useRepeatRequest/reducer: unknown action.type ${action.type}`);
  }
}

function useRepeatRequest(isOn, URL, delay, fnTransform) {
  //console.log('useRepeatRequest/begin')
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
    if (isOn && delay) {
      dispatch({ type: "session-begin" });
      savedCountSessionRequest.current = 0;

      fnRequest();
      let idInterval = setInterval(fnRequest, delay);
      return () => clearInterval(idInterval);
    } else {
      dispatch({ type: "session-pause" });
    }
  }, [isOn, delay, fnRequest]);


  const result = useMemo( () => {
    const { loading, data, error } = state;

    //console.log(`calcul result`)

    let info = {
      countRequest: savedCountSessionRequest.current
    };
    return [
      loading,
      data,
      error,

      info,
      //null,
    ];
  }, [state] )

  //console.log(`useRepeatRequest/END`)
  return result
}

export default useRepeatRequest;
