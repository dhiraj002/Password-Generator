import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [isNumber, setisNumber] = useState(false);
  const [isChar, setisChar] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef();

  const passwordGenrator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIKLMNOPQRSTVXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumber) str += "0123456789";
    if (isChar) str += "@!#$%&*+_-{}<>";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, isNumber, isChar, setPassword]);

  const copyPassword = () => {
    passwordRef.current?.select();
    window, navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    passwordGenrator();
  }, [length, isNumber, isChar, passwordGenrator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-4xl text-center text-white mb-4">
          Password Genrator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-2">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 "
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1 mb-1">
            <input
              type="range"
              min={8}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={isNumber}
              id="numberInp"
              onChange={(e) => {
                setisNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInp">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={isChar}
              id="charInp"
              onChange={(e) => {
                setisChar((prev) => !prev);
              }}
            />
            <label htmlFor="charInp">Special Char.</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
