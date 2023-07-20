import React from "react";
import Lottie from "lottie-react";
import animationData from "./../../style/Animation/mazepath.json";

const MazePath = () => {
  return (
    <div className="mazePathContainer">
      <Lottie
        animationData={animationData}
        autoPlay={true}
        loop={true}
        height={400}
        width={400}
      />
      <div />
    </div>
  );
};

export default MazePath;
