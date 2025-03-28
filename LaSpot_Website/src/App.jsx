import "./App.css";
import "./css/Header1.css";
import "./css/Footer.css";
import "./css/ScrollUp.css";

import { Header1 } from "./components/Header1";
import { Footer } from "./components/Footer";
import { ScrollUp } from "./components/ScrollUp";
import { MainPage } from "./pages/MainPage";

function App() {
  return (
    <>
      <Header1 />
      <MainPage />
      <Footer />
      <ScrollUp />
    </>
  );
}

export default App;
