import React, { useState, useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";

const EmoijiPickerBackground = ({
  text,
  setText,
  user,
  type2,
  setBackground,
}) => {
  const [picker, setPicker] = useState(false);
  const [showBg, setShowBg] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const textRef = useRef(null);
  const bgRef = useRef(null);

  /** Resize Post TextArea Start */
  const useAutosizeTextArea = (textAreaRef, value) => {
    useEffect(() => {
      if (textAreaRef && textAreaRef?.current) {
        (textAreaRef.current || {}).style.height = "0px";
        const scrollHeight = (textAreaRef.current || {}).scrollHeight;

        (textAreaRef.current || {}).style.height = scrollHeight + "px";
      }
    }, [textAreaRef, value]);
  };
  useAutosizeTextArea(textRef, text);

  /** Adjust the cursor to the initial position */
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  /**Handle emoiji with text */
  const handleEmoji = ({ emoji }) => {
    const ref = textRef.current;

    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };

  //** Handler post background */
  const postBackgrounds = [
    "../../../images/postBackgrounds/1.jpg",
    "../../../images/postBackgrounds/2.jpg",
    "../../../images/postBackgrounds/4.jpg",
    "../../../images/postBackgrounds/9.jpg",
    "../../../images/postBackgrounds/5.jpg",
    "../../../images/postBackgrounds/6.jpg",
    "../../../images/postBackgrounds/7.jpg",
    "../../../images/postBackgrounds/8.jpg",
  ];

  const backgroundHanlder = (i) => {
    bgRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;
    setBackground(postBackgrounds[i]);
    bgRef.current.classList.add("bgHandler");
  };
  const removeBackground = () => {
    bgRef.current.style.backgroundImage = "";
    setBackground("");
    bgRef.current.classList.remove("bgHandler");
  };

  return (
    <div className={type2 && "images_input"}>
      <div className={!type2 && "flex_center"} ref={bgRef}>
        <textarea
          ref={textRef}
          value={text}
          placeholder={`${user?.first_name} ơi, bạn đang nghĩ gì thế?`}
          className={`post_input ${type2 && "input2"}`}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <div className="post_emojis_wrap">
        {picker && (
          <div
            className={`comment_emoji_picker ${
              type2 ? "movepicker2" : "rlmove"
            }`}
          >
            <EmojiPicker
              onEmojiClick={handleEmoji}
              height={250}
              width={320}
              searchDisabled
              skinTonesDisabled
            />
          </div>
        )}
        {!type2 && (
          <img
            src="../../../icons/colorful.png"
            alt=""
            onClick={() => {
              setShowBg((prev) => !prev);
            }}
          />
        )}
        {!type2 && showBg && (
          <div className="post_backgrounds">
            <div
              className="no_bg"
              onClick={() => {
                removeBackground();
              }}
            ></div>
            {postBackgrounds.map((bg, i) => (
              <img
                src={bg}
                key={i}
                alt=""
                onClick={() => {
                  backgroundHanlder(i);
                }}
              />
            ))}
          </div>
        )}
        <i
          className={`emoji_icon_large ${type2 && "moveleft"}`}
          onClick={() => {
            setPicker((prev) => !prev);
          }}
        ></i>
      </div>
    </div>
  );
};

export default EmoijiPickerBackground;
