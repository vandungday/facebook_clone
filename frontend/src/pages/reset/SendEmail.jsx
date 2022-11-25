import axios from "axios";
import { Link } from "react-router-dom";
import "./style.scss";

export default function SendEmail({
  userInfo,
  email,
  error,
  setError,
  setVisible,
}) {
  const sendEmail = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/sendCode`, {
        email,
      });

      setError("");
      setVisible(2);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="reset_form dynamic_height">
      <div className="reset_form_header">Reset Your Password</div>
      <div className="reset_grid">
        <div className="reset_left">
          <div className="reset_form_text">
            How do you want to receive the code to reset your password?
          </div>
          <label htmlFor="email" className="hover1">
            <input type="radio" name="" id="email" checked readOnly />
            <div className="label_col">
              <span>Send code via email</span>
              <span>{`${userInfo?.email}`}</span>
            </div>
          </label>
        </div>
        <div className="reset_right">
          <img src={userInfo?.picture} alt="" />
          <span>{`${userInfo?.email}`}</span>
          <span>Facebook user</span>
        </div>
      </div>
      <div className="reset_form_btns">
        <Link to="/login" className="gray_btn">
          Not You ?
        </Link>
        <button
          type="submit"
          className="blue_btn"
          onClick={() => {
            sendEmail();
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
