import React, {
  useState,
  useEffect,
  useRef,
  useReducer
  // useContext,
  // createContext
} from "react";
import ReactDOM from "react-dom";

const API = "https://api.wheretheiss.at/v1/satellites/25544";

// const DataContext = createContext({ first: "Ryan", last: "Heupler" });

const useFetch = url => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(res => {
        setData(res);
      });
  }, []);
  return data;
};

function issReducer(state, action) {
  switch (action.type) {
    case "set":
      return {
        name: action.payload.name,
        lat: action.payload.latitude,
        long: action.payload.longitude
      };
    case "change name":
      return {
        ...state,
        name: action.payload.newName
      };
    default:
      throw new Error();
  }
}

export default function Func() {
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasCounter, setHasCounter] = useState(false);
  const data = useFetch(API);
  const [issState, dispatch] = useReducer(issReducer, {
    name: "Placeholder Name",
    lat: "Placeholder Lat",
    long: "Placeholder Long"
  });

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "set", payload: data });
        setLoading(false);
      });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {!loading && (
        <div>
          <p>Name: {issState.name}</p>
          <p>Latitude: {issState.lat}</p>
          <p>Longitude: {issState.long}</p>
          <button
            onClick={() =>
              dispatch({ type: "change name", payload: { newName: "Ryan" } })
            }
          >
            Change Name
          </button>
        </div>
      )}
      <button onClick={() => setHasCounter(c => !c)}>Toggle Counter</button>
      {hasCounter && <Counter counter={counter} name={issState.name} />}
      <button onClick={() => setCounter(c => c + 1)}>Increment Counter</button>
      <button onClick={() => setCounter(c => c - 1)}>Decrement Counter</button>
      <button onClick={() => setInterval(() => setCounter(c => c + 1), 1000)}>
        Auto increment
      </button>
    </div>
  );
}

function Counter({ counter }) {
  const [updatedCounter, setUpdatedCounter] = useState(0);
  const [render, setRender] = useState(0);
  const initialMount = useRef(true);

  useEffect(() => {
    initialMount.current
      ? (initialMount.current = false)
      : setUpdatedCounter(uc => uc + 1);
    return () => setRender(c => c + 1);
  }, [counter]);

  return (
    <div>
      <p>Counter: {counter}</p>
      <p>Times counter has changed: {updatedCounter}</p>
      <p>Re-render: {render}</p>
    </div>
  );
}
