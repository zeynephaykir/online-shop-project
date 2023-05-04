import "./App.css";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Link to="/">Crochet By Sarin</Link>
        </header>
        <main>
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>

        </main>
        <footer>
          <div className="text-center"> All rights reserved 2023</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
