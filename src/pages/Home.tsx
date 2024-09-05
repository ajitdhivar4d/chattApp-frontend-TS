import AppLayout from "../components/layout/AppLayout";

const Home = () => {
  return (
    <div style={{ backgroundColor: "orange" }}> Select a friend to chat</div>
  );
};

export default AppLayout()(Home);
