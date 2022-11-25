import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useState } from "react";
import SearchAccount from "./SearchAccount";
import SendEmail from "./SendEmail";
import CodeVerification from "./CodeVerification";
import Footer from "../../components/login/Footer";
import ChangePassword from "./ChangePassword";

export default function Reset() {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [visible, setVisible] = useState(0);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const logout = () => {
    Cookies.remove("user");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };

  return (
    <div className="reset">
      <div className="reset_header">
        <img src="../../../icons/facebook.svg" alt="" />

        {user ? (
          <div className="right_reset">
            <Link to="/profile">
              <img src={user.picture} alt="" />
            </Link>
            <button
              className="blue_btn"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="right_reset">
            <button className="blue_btn">Login</button>
          </Link>
        )}
      </div>
      <div className="reset_wrap">
        {visible === 0 && (
          <SearchAccount
            email={email}
            setEmail={setEmail}
            error={error}
            setError={setError}
            setVisible={setVisible}
            setUserInfo={setUserInfo}
          />
        )}
        {visible === 1 && (
          <SendEmail
            email={email}
            userInfo={userInfo}
            error={error}
            setError={setError}
            setUserInfo={setUserInfo}
            setVisible={setVisible}
          />
        )}
        {visible === 2 && (
          <CodeVerification
            user={user}
            code={code}
            setCode={setCode}
            error={error}
            setError={setError}
            setVisible={setVisible}
            userInfo={userInfo}
          />
        )}
        {visible === 3 && (
          <ChangePassword
            resetPassword={resetPassword}
            setResetPassword={setResetPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            error={error}
            setError={setError}
            setVisible={setVisible}
            userInfo={userInfo}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
