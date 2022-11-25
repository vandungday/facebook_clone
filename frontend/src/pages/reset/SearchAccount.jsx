import axios from "axios";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";
export default function SearchAccount({
  email,
  setEmail,
  error,
  setError,
  setUserInfo,
  setVisible,
}) {
  const validateEmail = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Must be a valid email address")
      .max(50, "Email address can't be more than 50 characters"),
  });

  const handler = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/identify`,
        { email }
      );
      setUserInfo(data);

      setVisible(1);
      setError("");
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className="reset_form">
      <div className="reset_form_header">Tìm kiếm tài khoản của bạn</div>
      <div className="reset_form_text">
        Vui lòng nhập địa chỉ email hoặc số điện thoại để tìm kiếm tài khoản của
        bạn
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          email,
        }}
        validationSchema={validateEmail}
        onSubmit={() => {
          handler();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address or phone number"
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
