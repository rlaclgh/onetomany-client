"use client";

import BottomNavigation from "@/components/bottom-navigation";
import Channels from "@/components/channels";
import HeaderCenter from "@/components/common/header-center";
import Header from "@/components/header";

const ChannelsPage = () => {
  return (
    <>
      <Header renderCenter={() => <HeaderCenter>참여중인 채널</HeaderCenter>} />

      <div
        className="overflow-y-scroll flex-1 pl-2 pr-2"
        style={{ height: "calc(calc(var(--vh, 1vh) * 100) - 112px)" }}
      >
        <Channels />
      </div>
      <BottomNavigation />
    </>
  );
};

export default ChannelsPage;
