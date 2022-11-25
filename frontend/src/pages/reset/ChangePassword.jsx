import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";
import * as Yup from "yup";
import axios from "axios";
export default function ChangePassword({
  resetPassword,
  setResetPassword,
  confirmPassword,
  setConfirmPassword,
  error,
  setError,
  userInfo,
}) {
  const navigate = useNavigate();
  const validatePassword = Yup.object({
    resetPassword: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),

    confirmPassword: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });
  const { email } = userInfo;
  const changePassword = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/resetPassword`, {
        email,
        resetPassword,
      });
      setError("");
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className="reset_form" style={{ height: "310px" }}>
      <div className="reset_form_header">Change Password</div>
      <div className="reset_form_text">Pick a strong password</div>
      <Formik
        enableReinitialize
        initialValues={{
          resetPassword,
          confirmPassword,
        }}
        validationSchema={validatePassword}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="password"
              name="password"
              onChange={(e) => setResetPassword(e.target.value)}
              placeholder="New password"
            />
            <LoginInput
              type="password"
              name="conf_password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              bottom
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button
                type="submit"
                className="blue_btn"
                onClick={() => {
                  changePassword();
                }}
              >
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
