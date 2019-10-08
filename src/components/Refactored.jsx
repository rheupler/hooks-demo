import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo
} from "react";
const API = "https://api.wheretheiss.at/v1/satellites/25544";

function useFetch() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log(data);

  useEffect(() => {
    console.log("here");
    const fetchData = async () => {
      fetch(API);
      const res = await fetch(API);
      const json = await res.json();
      setData(json);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return [data, isLoading];
}

export default function Refactored() {
  const [name, setName] = useState("Placeholder Name");
  const [lat, setLat] = useState("Placeholder Lat");
  const [long, setLong] = useState("Placeholder Long");
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasCounter, setHasCounter] = useState(false);
  // const issData = useFetch(API);

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        setName(data.name);
        setLat(data.latitude);
        setLong(data.longitude);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {!loading ? (
        <>
          <p>name: {name}</p>
          <p>lat: {lat}</p>
          <p>long: {long}</p>
          <button onClick={() => setHasCounter(c => !c)}>Toggle Counter</button>
          {hasCounter && (
            <>
              <Counter counter={counter} />
              <button onClick={() => setCounter(c => c + 1)}>
                Increment Counter
              </button>
              <button onClick={() => setCounter(c => c - 1)}>
                Decrement Counter
              </button>
              <button
                onClick={() => setInterval(() => setCounter(c => c + 1), 1000)}
              >
                Auto increment
              </button>
            </>
          )}
        </>
      ) : (
        <>Loading...</>
      )}
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
    return () => setRender(r => r + 1);
  }, [counter]);

  return (
    <div>
      <p>Counter: {counter}</p>
      <p>Times counter has changed: {updatedCounter}</p>
      <p>Re-render: {render}</p>
    </div>
  );
}
