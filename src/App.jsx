import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  let [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str = str + "0123456789";
    if (character) str = str + "!@#$%^&*()";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass = pass + str.charAt(char);
    }

    setPassword(pass);
  }, [length, number, character]);

  const copyPassToClip = useCallback(() => {
    if (navigator.clipboard) {
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0, 99999); // for mobile devices
      document.execCommand("copy");
      // Provide feedback to the user (optional)
      alert("Password copied to clipboard!");
    } else if (navigator.share) {
      navigator.share({
        title: "Password",
        text: password,
      })
        .then(() => console.log("Password shared successfully"))
        .catch((error) => console.error("Error sharing password:", error));
    } else {
      // Fallback for unsupported browsers
      alert(
        "Clipboard access is not supported on this device. Please copy the password manually."
      );
    }
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, character]);

  return (
    <div className="container max-w-md mx-auto shadow-md rounded-lg px-4 my-8 bg-gradient-to-r from-gray-500 to-green-500 text-black">
      <h1 className="text-center my-center text-2xl font-semibold ">
        Password Generator
      </h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 bg-gray-200 text-gray-800"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />

        <button
          onClick={copyPassToClip}
          className="outline-none bg-blue-500 hover:bg-blue-600 text-white px-3 py-0.5"
        >
          Copy
        </button>
      </div>

      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className=" cursor-pointer appearance-none bg-yellow-500  rounded-full "
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            checked={number}
            id="numberInput"
            onChange={() => {
              setNumber((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Number</label>

          <input
            type="checkbox"
            checked={character}
            id="characterInput"
            onChange={() => {
              setCharacter((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
