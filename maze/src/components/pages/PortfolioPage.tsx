import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RootState, store } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { Collection } from "../../types/collectionType";
import { getCreative } from "../../redux/actions/creativeAction";

const PortfolioPage = () => {
  const dispatch = store.dispatch;
  const navigate = useNavigate();
  const usernameUrl = useParams().username;

  const login = useSelector((state: RootState) => state.login);
  const me = useSelector((state: RootState) => state.creative.me.c);
  const selectedCreative = useSelector(
    (state: RootState) => state.creative.selected.c
  );
  const [creative, setCreative] = useState(me);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [itsMe, setItsMe] = useState(false);

  const loadData = async () => {
    if (usernameUrl === "me") {
      setItsMe(true);
      setCreative(me);
    } else {
      setItsMe(false);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await dispatch(getCreative(usernameUrl!));
      setCreative(selectedCreative);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usernameUrl]);

  useEffect(() => {
    if (!login.loggedIn) {
      navigate("/");
    }
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Container className="pageContainer"></Container>;
};

export default PortfolioPage;
