import React from "react";
import { Link } from "react-router-dom";
import { Feeling, LiveVideo, Photo } from "../../../svg";
import "./style.scss";

const CreatePost = ({ user }) => {
  return (
    <div className="createPost">
      <div className="createPost_header">
        <Link to="/profile">
          <img src={user?.picture} alt="" />
        </Link>
        <div className="open_post hover2">
          {user?.first_name} ơi, bạn đang nghĩ gì thế?
        </div>
      </div>
      <div className="create_splitter"></div>
      <div className="createPost_body">
        <div className="createPost_icon hover1">
          <LiveVideo color="#f3425f" />
          Live Video
        </div>
        <div className="createPost_icon hover1">
          <Photo color="#4bbf67" />
          Photo/Video
        </div>
        <div className="createPost_icon hover1">
          <Feeling color="#f7b928" />
          Feeling/Activity
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
