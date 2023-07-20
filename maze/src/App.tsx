import "./style/style.scss";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import HomePage from "./components/pages/HomePage";
import MazeNavbar from "./components/elements/MazeNavbar";
import { useSelector } from "react-redux";
import { RootState, store } from "./redux/store/store";
import { useEffect } from "react";
import { getMe } from "./redux/actions/meAction";
import PortfolioPage from "./components/pages/Portfolio";
import FeedPage from "./components/pages/FeedPage";

function App() {
  const login = useSelector((state: RootState) => state.login);
  const dispatch = store.dispatch;

  useEffect(() => {
    if (login.loggedIn) {
      dispatch(getMe(login.session!.username));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  return (
    <div className="App">
      <BrowserRouter>
        <MazeNavbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/portfolio/:username" element={<PortfolioPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
