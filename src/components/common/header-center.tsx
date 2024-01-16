interface HeaderCenterProps {
  children: React.ReactNode;
}
const HeaderCenter = (props: HeaderCenterProps) => {
  const { children } = props;
  return <div className="text-lg">{children}</div>;
};

export default HeaderCenter;
