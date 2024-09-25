const LayoutLoader = () => {
  return <div>Loading...</div>;
};

const TypingLoader = () => {
  return (
    <div className="typing-loader">
      <div className="bouncing-ball" style={{ animationDelay: "0.1s" }}></div>
      <div className="bouncing-ball" style={{ animationDelay: "0.2s" }}></div>
      <div className="bouncing-ball" style={{ animationDelay: "0.4s" }}></div>
      <div className="bouncing-ball" style={{ animationDelay: "0.6s" }}></div>
    </div>
  );
};

export { LayoutLoader, TypingLoader };
