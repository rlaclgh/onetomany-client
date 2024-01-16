import React from "react";

interface HeaderProps {
  renderCenter: () => React.ReactNode;
}
const Header = (props: HeaderProps) => {
  const { renderCenter } = props;
  return (
    <div className="border-solid border-black h-12 flex justify-center align-middle shadow">
      {/* left */}
      <div className="w-5"></div>

      {/* center */}
      <div className="flex-1 justify-center items-center flex">
        {renderCenter()}
      </div>

      {/* right */}
      <div className="w-5"></div>
    </div>
  );
};

export default Header;
