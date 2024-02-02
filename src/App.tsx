import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Input from "./components/input/Input";

function App() {
  const [value, setValue] = useState<string>("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }
  return (
    <>
      <div className="bg-black w-screen h-screen flex justify-center items-center">
        <Input
          value={value}
          onChange={onChange}
          label="Input label text"
          placeholder="This is a long text"
          helpertext="Helpertext"
          required
        />
      </div>
    </>
  );
}

export default App;
