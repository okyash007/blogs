import { useState } from "react";
import Editor from "./views/components/Editor";
import { Login } from "./views/components/Login";
import Navbar from "./views/layout/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Editor />
      <Login />
    </>
  );
}

export default App;
