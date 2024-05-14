type Props = {
  children: React.ReactNode;
};

const FeedWraper = ({ children }: Props) => {
  return <div className="flex-1 relative top-0 pb-10">{children}</div>;
};

export default FeedWraper;
