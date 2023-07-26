import "./style/style.scss";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./components/pages/AuthPage";
import MazeNavbar from "./components/elements/MazeNavbar";
import { useSelector } from "react-redux";
import { RootState, store } from "./redux/store/store";
import { useEffect } from "react";
import { getMe } from "./redux/actions/creativeAction";
import PortfolioPage from "./components/pages/PortfolioPage";
import FeedPage from "./components/pages/FeedPage";
import PageNotFound from "./components/pages/PageNotFound";
import { getMyCollections } from "./redux/actions/collectionAction";
import CollectionPage from "./components/pages/CollectionPage";
import SearchPage from "./components/pages/SearchPage";
import { getAllCreatives } from "./redux/actions/allCreativesAction";

function App() {
  const login = useSelector((state: RootState) => state.login);
  const dispatch = store.dispatch;

  async function setMe() {
    await dispatch(getMe(login.session!.username));
    await dispatch(getMyCollections(login.session!.username));
  }

  useEffect(() => {
    if (login.loggedIn) {
      setMe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  useEffect(() => {
    dispatch(getAllCreatives());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <MazeNavbar />
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/portfolio/:username" element={<PortfolioPage />} />
          <Route
            path="/portfolio/:author/collections/:id"
            element={<CollectionPage />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
