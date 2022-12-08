import React, { useState } from "react";
import EmoijiPickerBackground from "./EmoijiPickerBackground";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
import "./style.scss";
import { createPost } from "../../functions/post.controller";
import { useRef } from "react";
import useClickOutside from "../../helpers/clickOutside";
import { ClipLoader, PulseLoader } from "react-spinners";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import uploadImages from "../../functions/uploadImages";

const CreatePostPopup = ({ user, setVisible }) => {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bgRef = useRef(null);
  useClickOutside(bgRef, () => {
    setVisible(false);
  });

  const postSubmit = async () => {
    if (background) {
      setLoading(true);
      const response = await createPost(
        null,
        background,
        text,
        null,
        user.id,
        user.token
      );
      setTimeout(() => {
        setVisible(false);
        setLoading(false);
      }, 1000);
      if (response === "success") {
        setBackground("");
        setText("");
        setTimeout(() => {
          setVisible(false);
        }, 1000);
      } else {
        setError(response);
      }
    } else if (images && images.length) {
      setLoading(true);
      const postImages = images.map((img) => {
        return dataURItoBlob(img);
      });

      const path = `post images/${user.username}`;
      let formData = new FormData();
      formData.append("path", path);
      postImages.forEach((image) => {
        formData.append("file", image);
      });

      const response = await uploadImages(formData, path, user.token);

      await createPost(null, null, text, response, user.id, user.token);

      setLoading(false);
      setText("");
      setImages("");
      setVisible(false);
    } else if (text) {
      setLoading(true);
      const response = await createPost(
        null,
        null,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);
      if (response === "success") {
        setBackground("");
        setText("");
        setVisible(false);
      } else {
        setError(response);
      }
    }
  };

  return (
    <div className="blur">
      <div className="postBox" ref={bgRef}>
        {loading && (
          <div className="blur_loading">
            <ClipLoader />
            Đang đăng
          </div>
        )}
        <div className="box_header">
          <div
            className="small_circle"
            onClick={() => {
              setVisible(false);
            }}
          >
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
          onClick={() => {
            postSubmit();
          }}
        >
          {loading ? <PulseLoader size={6} /> : "Đăng"}
        </button>
      </div>
    </div>
  );
};

export default CreatePostPopup;
