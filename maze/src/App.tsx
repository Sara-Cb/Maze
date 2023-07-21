import "./style/style.scss";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./components/pages/AuthPage";
import MazeNavbar from "./components/elements/MazeNavbar";
import { useSelector } from "react-redux";
import { RootState, store } from "./redux/store/store";
import { useEffect } from "react";
import { getMe } from "./redux/actions/meAction";
import PortfolioPage from "./components/pages/PortfolioPage";
import FeedPage from "./components/pages/FeedPage";
import PageNotFound from "./components/pages/PageNotFound";

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
          <Route path="/" element={<AuthPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/portfolio/:username" element={<PortfolioPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
