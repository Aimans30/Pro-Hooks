import React, { useEffect, useState, useMemo, useCallback } from 'react';
import './App.css';

// Do not change this
const LARGE_NUMBER = 1000000000;

function App() {
  const [value, setValue] = useState(0);
  const [dark, setDark] = useState(true);
  const [currentList, setList] = useState([]);
  const [themeName, setThemeName] = useState("dark");

  const delayFunction = useCallback(() => {
    console.log("Delay Function Ran");
    // Move the heavy computation to a separate thread using setTimeout
    setTimeout(() => {
      for (let index = 0; index < LARGE_NUMBER; index++) { }
      setValue(prevValue => prevValue + 2);
    }, 0);
  }, []);

  const testFunction = useMemo(() => {
    return [value * 3, value * 4];
  }, [value]);

  useEffect(() => {
    console.log("Callback Function was called");
  }, [testFunction]);

  useEffect(() => {
    if (dark) {
      setThemeName("dark");
    } else {
      setThemeName("light");
    }
  }, [dark]);

  const handleClick = useCallback(() => {
    setDark(prevDark => !prevDark);
  }, []);

  const handleChangeValue = useCallback(() => {
    setValue(prevValue => prevValue + 1);
  }, []);

  const handleList = useCallback(() => {
    setList(testFunction);
  }, [testFunction]);

  const styleTheme = useMemo(() => ({
    backgroundColor: dark ? "black" : "#ccc7c7",
  }), [dark]);

  return (
    <div className="page" style={styleTheme}>
      <button onClick={handleClick}>{themeName}</button>
      <h1>{value}</h1>
      <button onClick={handleChangeValue}>Change Value</button>
      <button onClick={handleList}>Show List</button>
      <h2>{value + 2}</h2> {/* Display the value directly without the delayFunction */}
      <div>
        {currentList.map((item, index) => {
          return <h2 key={index}>{item}</h2>
        })}
      </div>
    </div>
  );
}

export default App;
