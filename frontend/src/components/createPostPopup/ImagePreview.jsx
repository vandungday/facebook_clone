import React from "react";
import { useRef } from "react";
import EmoijiPickerBackground from "./EmoijiPickerBackground";

function ImagePreview({ text, user, setText, images, setImages, setShowPrev }) {
  const imageInputRef = useRef(null);
  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readerEvent) => {
        setImages((images) => [...images, readerEvent.target.result]);
      };
    });
  };

  return (
    <div className="overflow_a">
      <EmoijiPickerBackground text={text} user={user} setText={setText} type2 />
      <div className="add_pics_wrap">
        <input
          accept="image/*,image/heif,image/heic,video/*,video/mp4,video/x-m4v,video/x-matroska,.mkv"
          type="file"
          multiple
          hidden
          ref={imageInputRef}
          onChange={handleImages}
        />
        {images && images.length ? (
          <div className="add_pics_inside1 p0">
            <div className="preview_actions">
              <button className="hover1">
                <i className="edit_icon"></i>Chỉnh sửa
              </button>
              <button
                className="hover1"
                onClick={() => {
                  imageInputRef.current.click();
                }}
              >
                <i className="addPhoto_icon"></i>
                Thêm ảnh/video
              </button>
            </div>
            <div
              className="small_white_circle"
              onClick={() => {
                setShowPrev(false);
                setImages([]);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className={
                images.length === 1
                  ? "preview1"
                  : images.length === 2
                  ? "preview2"
                  : images.length === 3
                  ? "preview3"
                  : images.length === 4
                  ? "preview4"
                  : images.length === 5
                  ? "preview5"
                  : "previewmany"
              }
            >
              {images.length < 5 &&
                images.map((img, i) => <img src={img} key={i} alt="" />)}
              {images.length >= 5 && (
                <>
                  <div className="preview5_start">
                    {images.slice(0, 2).map((img, i) => (
                      <img src={img} key={i} alt="" />
                    ))}
                  </div>
                  <div className="preview5_end">
                    {images.slice(2, 5).map((img, i) => (
                      <img src={img} key={i} alt="" />
                    ))}

                    {images.length > 5 && (
                      <div className="preview_number">
                        <span>+{images.length - 4}</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="add_pics_inside1">
            <div
              className="small_white_circle"
              onClick={() => {
                setShowPrev(false);
                setImages([]);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className="add_col"
              onClick={() => {
                imageInputRef.current.click();
              }}
            >
              <div className="add_circle">
                <i className="addPhoto_icon"></i>
              </div>
              <span>Thêm ảnh/video</span>
              <span>hoặc kéo và thả</span>
            </div>
          </div>
        )}
        <div className="add_pics_inside2">
          <div className="add_circle">
            <i className="phone_icon"></i>
          </div>
          <div className="mobile_text">
            Thêm ảnh và video từ thiết bị di động.
          </div>
          <span className="addphone_btn">Thêm</span>
        </div>
      </div>
    </div>
  );
}

export default ImagePreview;
