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
  const username = useParams().username;

  const login = useSelector((state: RootState) => state.login);
  const me = useSelector((state: RootState) => state.me.creative);
  const creative = useSelector((state: RootState) => state.selectedCreative);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [itsMe, setItsMe] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (username === "me") {
        setItsMe(true);
        await dispatch(getCreative(me.username));
      } else {
        setItsMe(false);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await dispatch(getCreative(username!));
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useEffect(() => {
    if (!login.loggedIn) {
      navigate("/");
    }
    const loadData = async () => {
      if (username === "me") {
        setItsMe(true);
        await dispatch(getCreative(me.username));
      } else {
        setItsMe(false);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await dispatch(getCreative(username!));
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Container className="pageContainer"></Container>;
};

export default PortfolioPage;
