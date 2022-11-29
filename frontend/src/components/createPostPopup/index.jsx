import React, { useState } from "react";
import EmoijiPickerBackground from "./EmoijiPickerBackground";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
import "./style.scss";

const CreatePostPopup = ({ user }) => {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("");

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
          <img src={user?.picture} alt="" className="box_profile_img" />
          <div className="box_col">
            <div className="box_profile_name">
              {user?.first_name} {user?.last_name}
            </div>
            <div className="box_privacy">
              <img src="../../../icons/public.png" alt="" />
              <span>Công khai</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>

        {!showPrev ? (
          <EmoijiPickerBackground
            text={text}
            setText={setText}
            setShowPrev={setShowPrev}
            user={user}
            background={background}
            setBackground={setBackground}
          />
        ) : (
          <ImagePreview
            text={text}
            setText={setText}
            setShowPrev={setShowPrev}
            user={user}
            images={images}
            setImages={setImages}
          />
        )}

        <AddToYourPost setShowPrev={setShowPrev} />

        <button
          className={
            text || images.length !== 0
              ? "post_submit post_submit_active"
              : "post_submit"
          }
        >
          Đăng
        </button>
      </div>
    </div>
  );
};

export default CreatePostPopup;
