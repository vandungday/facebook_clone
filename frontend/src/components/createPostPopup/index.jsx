import React from "react";
import { useState } from "react";
import "./style.scss";

const CreatePostPopup = ({ user }) => {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  return (
    <div className="blur">
      <div className="postBox">
        <div className="box_header">
          <div className="small_circle">
            <i className="exit_icon"></i>
          </div>
          <span>Tạo bài viết</span>
        </div>
        <div className="box_profile">
          <img src={user.picture} alt="" className="box_profile_img" />
          <div className="box_col">
            <div className="box_profile_name">
              {user.first_name} {user.last_name}
            </div>
            <div className="box_privacy">
              <img src="../../../icons/public.png" alt="" />
              <span>Công khai</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>
        {!showPrev && (
          <div className="flex_center">
            <textarea
              //   maxLength={500}
              value={text}
              placeholder={`${user.first_name} ơi, Bạn đang nghĩ gì thế?`}
              className="post_input"
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
        )}
        <div className="post_emojis_wrap">
          <div className="comment_emoji_picker remove"></div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPopup;
