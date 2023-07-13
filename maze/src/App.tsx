import "./style/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/loginPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
