import { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";

const MeSection = () => {
  const me = useSelector((state: RootState) => state.me.creative);

  return (
    <div className="mirror">
      <h3>{me.stageName}</h3>
      <p className="myLink">@{me.username}</p>
    </div>
  );
};

export default MeSection;
