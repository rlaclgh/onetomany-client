"use client";
import Lottie from "react-lottie-player";

import * as lottieJson from "../../public/preparing.json";

const Preparing = () => {
  return (
    <div className="flex justify-center items-center flex-col flex-1">
      <div className="h-40" />
      <p className="text-2xl">준비중인 기능입니다.</p>
      <Lottie
        loop
        animationData={lottieJson}
        play
        style={{ width: 400, height: 400 }}
      />
    </div>
  );
};

export default Preparing;
