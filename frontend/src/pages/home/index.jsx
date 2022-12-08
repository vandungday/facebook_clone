import React from "react";
import { useSelector } from "react-redux";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import CreatePost from "../../components/home/post";
import RightHome from "../../components/home/right";
import SendVerification from "../../components/home/sendVerification";
import Stories from "../../components/home/stories";
import "./style.css";

const Home = ({ setVisible }) => {
  const { user } = useSelector((user) => ({ ...user }));
  return (
    <div className="home">
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories user={user} />
        {!user.verified && <SendVerification user={user} />}
        <CreatePost user={user} setVisible={setVisible} />
      </div>
      <RightHome user={user} />
    </div>
  );
};

export default Home;
