/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from "react";
import { Return, Search } from "../../svg";
import useClickOutside from "../../helpers/clickOutside";

const SearchMenu = ({ color, setShowSearchMenu }) => {
  const menu = useRef(null);

  useClickOutside(menu, () => {
    setShowSearchMenu(false);
  });

  return (
    <div className="header_left search_area scrollbar" ref={menu}>
      <div className="search_wrap">
        <div className="header_logo">
          <div
            className="circle hover1"
            onClick={() => {
              setShowSearchMenu(false);
            }}
          >
            <Return color={color} />
          </div>
        </div>
        <div className="search">
          <div>
            <Search color={color} />
          </div>
          <input type="text" placeholder="Tìm kiếm trên Facebook" />
        </div>
      </div>
      <div className="search_history_header">
        <span>Tìm kiếm gần đây</span>
        <a href="#">Chỉnh sửa</a>
      </div>
      <div className="search_history"></div>
      <div className="search_results scrollbar"></div>
    </div>
  );
};

export default SearchMenu;
