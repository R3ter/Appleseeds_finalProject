import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import "./app.css";
import MainPage from "./pages/MainPage";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MainPage />
    </>
  );
}
