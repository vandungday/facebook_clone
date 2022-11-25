import axios from "axios";
import { useState } from "react";
import "./style.scss";

const SendVerification = ({ user }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const sendVerificationLink = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendVerification`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className="send_verification">
      <span>
        Tài khoản của bạn chưa được xác thực, hãy xác thực tài khoản của bạn
        trước khi nó bị xoá sau một tháng kể từ khi tạo tài khoản
      </span>
      <a
        onClick={() => {
          sendVerificationLink();
        }}
      >
        Bấm vào đây để gửi lại đường dẫn xác thực
      </a>

      {success && <div className="success_text">{success}</div>}
      {error && <div className="error_text">{error}</div>}
    </div>
  );
};

export default SendVerification;
